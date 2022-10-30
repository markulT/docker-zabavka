import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../../hooks/useEffectOnce";
import {createSubThunk} from "../../storage/reducers/authReducer";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function PaymentsPage() {

    const user = useSelector(state=> state.authReducer)
    const paymentData = useSelector(state=>state.payReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    let script

    const createSub = async (password, tariff, orderId, acqId) => {
        await dispatch(createSubThunk({
            login:user.login,
            password:password,
            fullName:user.fullName,
            tariff:tariff,
            orderId:orderId,
            acqId:acqId
        }))
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
                    data: "eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJhbW91bnQiOiIxMiIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiLQv9C+0LTQv9C40YHQutCwIFN0YW5kYXJ0IE1vYmlsZSBNYXhpbXVtIiwicHVibGljX2tleSI6InNhbmRib3hfaTE1NTk3MDAyNTI3IiwibGFuZ3VhZ2UiOiJydSIsInN1YnNjcmliZSI6MSwic3Vic2NyaWJlX2RhdGVfc3RhcnQiOiJub3ciLCJzdWJzY3JpYmVfcGVyaW9kaWNpdHkiOiJtb250aCJ9",
                    signature: "ykPYYHgTA+3/A1oCiWJFTwPNmwQ=",
                    embedTo: "#liqpay_checkout",
                    mode: "embed" // embed || popup,
                }).on("liqpay.callback", function(data){
                    console.log(data.status);
                    console.log(data);
                    if(data.status == "subscribed") {
                        // await createSub(paymentData.password, paymentData.tariff, data.order_id, data.acq_id)
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
        return () => {
            document.body.removeChild(script);
        }
    })
    return(
        <div>
            <div id='liqpay_checkout'></div>
        </div>
    )
}

