import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';

// TODO: Verify email is not working check.

import useVerifyEmail from '../../api/auth/useVerifyEmail.js';

const VerifyEmail = () => {

    const [verificationCode, setVerificationCode] = useState('');
    const { setShowVerifyEmail } = useAppContext();

    const { loading, verifyEmail, sendCodeAgain } = useVerifyEmail();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await verifyEmail(verificationCode);
    }

    const sendCode = async () => {
        await sendCodeAgain();
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            return document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form className='relative bg-white p-8 rounded-xl' onSubmit={handleSubmit}>
                <h1 className='text-center text-2xl font-bold mb-1.5'>Verify Your Email</h1>
                <div>
                    <p className='text-center mb-5'>Enter the 6-digit code sent to your email address</p>
                    <p className='text-center mb-5'>(Check your spam folder if you don't see it)</p>

                    <div>
                        <label className="label p-2">
                            <span className='text-base label-text'>Code</span>
                        </label>
                        <input type="text" placeholder="Enter verification code" className="w-full input input-bordered h-10"
                            value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </div>

                    <button disabled={loading} className="btn  btn-block btn-sm mt-2 bg-emerald-400 hover:bg-emerald-600 text-white">
                        {loading ? <span className='loading loading-spinner'></span> : 'Verify'}
                    </button>
                </div>

                <p onClick={sendCode} className=' text-emerald-800 hover:underline hover:text-emerald-600 mt-2 inline-block cursor-pointer'>
                    Send code again
                </p>

                <div onClick={() => setShowVerifyEmail(false)} className='absolute top-5 right-5 cursor-pointer text-gray-500'>
                    X
                </div>

            </form>
        </section>
    )
}

export default VerifyEmail
