import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../hooks/useEffectOnce";
import {createSubThunk, getFullProfile, getProfile} from "../../storage/reducers/authReducer";
import {useEffect} from "react";
import Router, {useRouter} from "next/router";

export default function PaymentsPage() {

    const user = useSelector(state=> state.authReducer)
    const paymentData = useSelector(state=>state.payReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    const tariffId = router.query.id
    let script

    const createSub = async (password, tariff, orderId, acqId,paymentData) => {
        await dispatch(createSubThunk({
            login:user.login,
            password:password,
            fullName:user.fullName,
            tariff:tariff,
            orderId:orderId,
            acqId:acqId,
            paymentData:paymentData
        }))
    }

    const subList = {
        standartTV:{
            data:'eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJhbW91bnQiOiI1IiwiY3VycmVuY3kiOiJVU0QiLCJkZXNjcmlwdGlvbiI6ItCf0L7QtNC/0LjRgdC60LAg0KHRgtCw0L3QtNCw0YDRgiDQotC10LvQtdCy0LjQtNC10L3QuNC1IiwicHVibGljX2tleSI6InNhbmRib3hfaTE1NTk3MDAyNTI3IiwibGFuZ3VhZ2UiOiJydSIsInN1YnNjcmliZSI6MSwic3Vic2NyaWJlX2RhdGVfc3RhcnQiOiJub3ciLCJzdWJzY3JpYmVfcGVyaW9kaWNpdHkiOiJtb250aCJ9',
            signature:'dLxhawnQ/IprndgEBRezjrCWFO4=',
        },
        premiumTV:{
            data: 'eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJhbW91bnQiOiIxMCIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiLQn9C+0LTQv9C40YHQutCwINCf0YDQtdC80LjRg9C8INCi0LXQu9C10LLQuNC00LXQvdC40LUiLCJwdWJsaWNfa2V5Ijoic2FuZGJveF9pMTU1OTcwMDI1MjciLCJsYW5ndWFnZSI6InJ1Iiwic3Vic2NyaWJlIjoxLCJzdWJzY3JpYmVfZGF0ZV9zdGFydCI6Im5vdyIsInN1YnNjcmliZV9wZXJpb2RpY2l0eSI6Im1vbnRoIn0=',
            signature:'dP88/ZEHgX5r1prX4iCopxmkQ7w='
        },
        standartMobile:{
            data:'eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJhbW91bnQiOiIxNSIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiLQn9C+0LTQv9C40YHQutCwIE1vYmlsZSBNYXhpbXVtIiwicHVibGljX2tleSI6InNhbmRib3hfaTE1NTk3MDAyNTI3IiwibGFuZ3VhZ2UiOiJydSIsInN1YnNjcmliZSI6MSwic3Vic2NyaWJlX2RhdGVfc3RhcnQiOiJub3ciLCJzdWJzY3JpYmVfcGVyaW9kaWNpdHkiOiJtb250aCJ9',
            signature: 'KKoZbXoq/hrPb23KnyPr4+a/TRw='
        }
    }
    const liqpayDataList = {
        'standart':subList.standartTV,
        'premium':subList.premiumTV,
        'mobile':subList.standartMobile
    }

    useEffect(()=>{
        if(!paymentData.password) {
            router.push('/')
        }
    },[])

    useEffectOnce(()=>{
        if (!!document) {
            console.log(document)
            window.LiqPayCheckoutCallback = function() {
                LiqPayCheckout.init({
                    data: liqpayDataList[tariffId].data,
                    signature: liqpayDataList[tariffId].signature,
                    embedTo: "#liqpay_checkout",
                    mode: "embed" // embed || popup,
                }).on("liqpay.callback", async function(data){
                    console.log(data.status);
                    console.log(data);
                    if(data.status == "subscribed") {
                        await createSub(paymentData.password, tariffId, data.order_id, data.acq_id, data)
                        await dispatch(getProfile(false))
                        await dispatch(getFullProfile())
                    }
                }).on("liqpay.ready", function(data){
                    // ready
                }).on("liqpay.close", function(data){
                    // close
                });
            };
            script = document.createElement('script');

            script.src = "//static.liqpay.ua/libjs/checkout.js";
            script.async = true;

            document.body.appendChild(script);
        }
        // return () => {
        //     document.body.removeChild(script);
        // }
    })
    return(
        <div>
            <div id='liqpay_checkout'></div>
        </div>
    )
}

