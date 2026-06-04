// import React from "react";
// import {
//   GraduationCap,
//   Sparkles,
//   BookOpen,
//   Video,
//   ShieldCheck,
//   CheckCircle2,
//   MessageCircle,
//   Mail,
//   User,
//   Smartphone,
//   CreditCard,
// } from "lucide-react";

// const LMSGuide = () => {

//   // ================= NUMBERS =================
//   const paymentNumber = "03204606482";      // JazzCash / EasyPaisa
//   const whatsappNumber = "03204606482";     // WhatsApp slip submission

//   return (
//     <div className="min-h-screen bg-zinc-100">

//       {/* HERO */}
//       <section className="relative bg-black text-white overflow-hidden">
//         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_35%)]" />

//         <div className="relative max-w-6xl mx-auto px-6 py-24">
//           <div className="flex items-center gap-3 mb-6">
//             <Sparkles />
//             <span className="text-sm tracking-widest uppercase text-zinc-300">
//               LMS Guide
//             </span>
//           </div>

//           <h1 className="text-4xl sm:text-6xl font-black leading-tight">
//             Learn Smarter With
//             <span className="block text-zinc-400 mt-2">
//               Modern LMS System
//             </span>
//           </h1>

//           <p className="mt-6 text-zinc-300 max-w-2xl leading-relaxed">
//             A complete guide to understand courses, video learning,
//             secure access, and payment process with WhatsApp verification.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="px-4 sm:px-6 lg:px-10 py-20">
//         <div className="max-w-5xl mx-auto">

//           <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-xl border border-zinc-200 space-y-10">

//             {/* ICON */}
//             <div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center shadow-lg">
//               <GraduationCap size={34} />
//             </div>

//             {/* CONTENT */}
//             <div className="space-y-6 text-zinc-700 text-lg leading-[2]">

//               <p>
//                 Welcome to a modern LMS platform where students can explore courses,
//                 enroll securely, and access video lectures anytime.
//               </p>

//               {/* PAYMENT SECTION */}
//               <div className="bg-gradient-to-r from-black to-zinc-800 text-white rounded-[35px] p-10 space-y-6">

//                 <div className="flex items-center gap-3">
//                   <CreditCard />
//                   <h2 className="text-2xl font-black">
//                     Payment & WhatsApp Verification
//                   </h2>
//                 </div>

//                 <p className="text-zinc-300">
//                   After payment, send your slip on WhatsApp for approval.
//                 </p>

//                 {/* PAYMENT NUMBER */}
//                 <div className="bg-white/10 border border-white/20 rounded-2xl p-5">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Smartphone size={18} />
//                     <span className="font-semibold">
//                       JazzCash / EasyPaisa Number
//                     </span>
//                   </div>

//                   <p className="text-2xl font-bold tracking-widest">
//                     {paymentNumber}
//                   </p>

//                   <p className="text-xs text-zinc-300 mt-2">
//                     Note: This is a JazzCash account number for course payment only.
//                   </p>
//                 </div>

//                 {/* WHATSAPP NUMBER */}
//                 <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-5">

//                   <div className="flex items-center gap-2 mb-2 text-green-300">
//                     <MessageCircle size={18} />
//                     <span className="font-semibold">
//                       WhatsApp Slip Submission Number
//                     </span>
//                   </div>

//                   <p className="text-2xl font-bold tracking-widest text-white">
//                     {whatsappNumber}
//                   </p>

//                   <p className="text-xs text-zinc-300 mt-2">
//                     Send payment slip + name + email to this WhatsApp number
//                   </p>
//                 </div>

//                 {/* REQUIRED DETAILS */}
//                 <div className="bg-white/10 border border-white/20 rounded-2xl p-5 space-y-2">

//                   <h3 className="font-semibold mb-2">
//                     Required WhatsApp Message:
//                   </h3>

//                   <div className="flex items-center gap-2">
//                     <User size={16} />
//                     <span>Full Name</span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Mail size={16} />
//                     <span>Email Address</span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <MessageCircle size={16} />
//                     <span>Payment Screenshot (Slip)</span>
//                   </div>

//                   <div className="mt-3 text-sm bg-black/30 p-3 rounded-xl">
//                     Example:
//                     <br />
//                     Name: Ali Khan <br />
//                     Email: ali@gmail.com <br />
//                     Course Payment Slip Attached
//                   </div>

//                 </div>

//               </div>

//               {/* FINAL */}
//               <div className="bg-black text-white rounded-[35px] p-10">

//                 <div className="flex items-center gap-3 mb-4">
//                   <CheckCircle2 className="text-green-400" />
//                   <h3 className="text-2xl font-black">
//                     Start Learning After Approval
//                   </h3>
//                 </div>

//                 <p className="text-zinc-300">
//                   Once verified, you will get full access to your courses and dashboard.
//                 </p>

//               </div>

//             </div>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default LMSGuide;






import React from "react";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Mail,
  User,
  Smartphone,
  CreditCard,
} from "lucide-react";

const LMSGuide = () => {
  const paymentNumber = "03214320946";
  const whatsappNumber = "03214320946";

  return (
    <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
      {/* HERO */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-16 md:py-20 lg:py-24">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-zinc-300">
              LMS Guide
            </span>
          </div>

          <h1 className="font-black leading-tight text-2xl sm:text-5xl lg:text-6xl xl:text-7xl">
            Learn Smarter With
            <span className="block text-zinc-400 mt-1 sm:mt-2">
              Modern LMS System
            </span>
          </h1>

          <p className="mt-3 sm:mt-6 text-xs sm:text-base lg:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            A complete guide to understand courses, video learning,
            secure access, and payment process with WhatsApp verification.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-3 sm:px-6 lg:px-10 py-6 sm:py-14 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-[40px] p-4 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-zinc-200 space-y-5 sm:space-y-10">
            {/* ICON */}
            <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-3xl bg-black text-white flex items-center justify-center shadow-lg">
              <GraduationCap size={20} className="sm:w-8 sm:h-8" />
            </div>

            {/* CONTENT */}
            <div className="space-y-4 sm:space-y-6 text-zinc-700 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-[2]">
              <p>
                Welcome to a modern LMS platform where students can explore
                courses, enroll securely, and access video lectures anytime.
              </p>

              {/* PAYMENT SECTION */}
              <div className="bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl sm:rounded-[35px] p-4 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-black">
                    Payment & WhatsApp Verification
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300">
                  After payment, send your slip on WhatsApp for approval.
                </p>

                {/* PAYMENT NUMBER */}
                <div className="bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <Smartphone size={14} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="font-semibold text-xs sm:text-sm">
                      JazzCash / EasyPaisa Number
                    </span>
                  </div>
                  <p className="text-base sm:text-2xl font-bold tracking-wider break-all">
                    {paymentNumber}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-300 mt-1.5 sm:mt-2">
                    Note: This is a JazzCash account number for course payment only.
                  </p>
                </div>

                {/* WHATSAPP NUMBER */}
                <div className="bg-green-500/10 border border-green-400/30 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 text-green-300">
                    <MessageCircle size={14} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="font-semibold text-xs sm:text-sm">
                      WhatsApp Slip Submission Number
                    </span>
                  </div>
                  <p className="text-base sm:text-2xl font-bold tracking-wider break-all">
                    {whatsappNumber}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-300 mt-1.5 sm:mt-2">
                    Send payment slip + name + email to this WhatsApp number
                  </p>
                </div>

                {/* REQUIRED DETAILS */}
                <div className="bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 space-y-2 sm:space-y-3">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Required WhatsApp Message:
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <User size={12} className="sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Full Name</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Mail size={12} className="sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Email Address</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <MessageCircle size={12} className="sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Payment Screenshot (Slip)</span>
                  </div>
                  <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs bg-black/30 p-2 sm:p-3 rounded-lg sm:rounded-xl overflow-x-auto">
                    Example:
                    <br />
                    Name: Ali Khan
                    <br />
                    Email: ali@gmail.com
                    <br />
                    Course Payment Slip Attached
                  </div>
                </div>
              </div>

              {/* FINAL */}
              <div className="bg-black text-white rounded-2xl sm:rounded-[35px] p-4 sm:p-8 lg:p-10">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <CheckCircle2 className="text-green-400 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-black">
                    Start Learning After Approval
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Once verified, you will get full access to your courses and dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LMSGuide;
