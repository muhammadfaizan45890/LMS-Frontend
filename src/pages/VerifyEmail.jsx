// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Loader2, MailCheck } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';
// import API from "../utils/api";


// const VerifyEmail = ({ userEmail }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSent, setIsSent] = useState(false);

//   const handleResendEmail = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.post(`${API}/user/resend-verification`, {
//         email: userEmail
//       });
//       if (res.data.success) {
//         toast.success(res.data.message || 'Verification email resent successfully!');
//         setIsSent(true);
//       } else {
//         toast.error(res.data.message || 'Failed to resend email.');
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || 'Something went wrong. Try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="bg-white border border-gray-200 shadow-xl rounded-2xl w-full max-w-md p-8 text-center space-y-6">
        
//         <div className="flex flex-col items-center space-y-4">
//           <div className="bg-gray-100 p-4 rounded-full">
//             <MailCheck className="w-10 h-10 text-black" />
//           </div>
//           <h2 className="text-2xl font-semibold text-black">✅ Verify Your Email</h2>
//           <p className="text-gray-700">
//             We’ve sent a verification link to{' '}
//             <span className="font-medium text-black">{userEmail}</span>. 
//             Please check your inbox and click the link to activate your account.
//           </p>
//         </div>

//         <div className="flex flex-col gap-4">
//           <Button
//             className="w-full bg-black text-white py-3 rounded-lg shadow-md flex justify-center items-center gap-2 hover:bg-gray-800"
//             onClick={handleResendEmail}
//             disabled={isLoading || isSent}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 Sending...
//               </>
//             ) : isSent ? (
//               "Email Sent ✅"
//             ) : (
//               "Resend Verification Email"
//             )}
//           </Button>
//           <p className="text-gray-700 text-sm">
//             Didn’t receive the email? Check your spam folder or try resending.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;










import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import API from "../utils/api";

const VerifyEmail = ({ userEmail }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleResendEmail = async () => {

    try {

      setIsLoading(true);

      const res = await axios.post(
        `${API}/user/resend-verification`,
        {
          email: userEmail
        }
      );

      if (res.data.success) {

        toast.success(
          res.data.message ||
          'Verification email resent successfully!'
        );

        setIsSent(true);

      } else {

        toast.error(
          res.data.message ||
          'Failed to resend email.'
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        'Something went wrong. Try again.'
      );

    } finally {

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl w-full max-w-md p-8 text-center space-y-6">

        {/* ICON + TITLE */}
        <div className="flex flex-col items-center space-y-4">

          <div className="bg-gray-100 p-4 rounded-full">
            <MailCheck className="w-10 h-10 text-black" />
          </div>

          <h2 className="text-2xl font-semibold text-black">
            ✅ Verify Your Email
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We’ve sent a verification link to{" "}
            <span className="font-medium text-black">
              {userEmail}
            </span>.
            Please check your inbox and click the link
            to activate your account.
          </p>

        </div>

        {/* BUTTON */}
        <div className="flex flex-col gap-4">

          <Button
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-lg
              shadow-md
              flex
              justify-center
              items-center
              gap-2
              hover:bg-gray-800
            "
            onClick={handleResendEmail}
            disabled={isLoading || isSent}
          >

            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : isSent ? (
              "Email Sent ✅"
            ) : (
              "Resend Verification Email"
            )}

          </Button>

          {/* MESSAGE */}
          <div className="space-y-2">

            <p className="text-gray-700 text-sm">
              Didn’t receive the email?
              Check your spam folder or try resending.
            </p>

            <p className="text-sm text-gray-500 leading-relaxed">
              If you still do not receive the verification email,
              your account may be manually verified by the admin
              within 24 hours after checking that your email
              address is valid.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VerifyEmail;
