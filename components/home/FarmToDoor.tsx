'use client';

import { motion } from 'framer-motion';

export const FarmToDoor = () => {
  const values = [
    {
      step: '01',
      title: '100% Βιολογική Καλλιέργεια',
      description: 'Χωρίς συνθετικά φυτοφάρμακα, με πλήρη σεβασμό στον φυσικό κύκλο της γης.',
      icon: (
    
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0.5"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="m 12.999977,1.001543 c 0,0 -1.095058,0.0042 -1.673614,0.458634 0.05974,0.150368 0.106017,0.309748 0.120694,0.482774 0.01519,0.09681 0.03264,0.320239 -0.008,0.635651 0.0999,-0.01081 0.201734,-0.01609 0.305756,-0.01609 0.142128,0 0.250849,0.01043 0.29771,0.01609 0.172511,0.01262 0.339936,0.06199 0.490819,0.120693 0.469384,-0.572891 0.466681,-1.697752 0.466681,-1.697752 z M 10.54588,1.138329 c -0.39317,0.06978 -0.9394122,0.55403 -1.1425622,1.118424 0.227611,0.233018 0.470092,0.562012 0.6034662,0.989685 0.03193,0.101961 0.05098,0.206691 0.06437,0.313802 l 0.820714,-0.820714 c 0.0028,-0.01493 0.0052,-0.0253 0.008,-0.04023 0.08831,-0.436684 0.03218,-0.691975 0.03218,-0.691975 C 10.906038,1.569607 10.545829,1.13833 10.545829,1.13833 Z M 8.6469729,2.296984 C 8.3709555,2.44452 8.0687396,2.878565 7.946952,3.351039 8.209838,3.57762 8.5720465,3.969052 8.7435275,4.51774 c 0.03167,0.101962 0.050981,0.206691 0.06437,0.313803 L 9.5481488,4.091291 C 9.5929488,3.871146 9.5880588,3.62873 9.5159688,3.399316 9.2950518,2.692021 8.6469771,2.296984 8.6469771,2.296984 Z m 3.1138861,0.780483 c -0.141356,-6.76e-4 -0.331761,0.01429 -0.53105,0.06437 l -0.764391,0.764391 c 0.04789,0.0085 0.0907,0.01126 0.136786,0.02414 0.441576,0.110459 0.870408,0.389888 1.174748,0.683929 0.552292,-0.211133 1.018522,-0.747784 1.086239,-1.134517 0,0 -0.431277,-0.360471 -0.868992,-0.386218 0,0 -0.09198,-0.01542 -0.23334,-0.01609 z M 7.3756706,3.56024 C 7.1166468,3.698506 6.8336774,4.095603 6.6997884,4.533832 c 0.2649458,0.22169 0.6500699,0.619237 0.8287603,1.190841 0.031927,0.101961 0.050981,0.214737 0.06437,0.321848 L 8.2768469,5.362593 C 8.3213908,5.142448 8.3242874,4.900289 8.2527083,4.670618 8.0317913,3.963323 7.3756706,3.56024 7.3756706,3.56024 Z m 2.8403144,0.828761 c -0.08725,-0.0024 -0.178239,0.0087 -0.2655252,0.02414 l -0.748298,0.756345 c 0.111231,0.01648 0.213128,0.04081 0.313803,0.08046 0.376434,0.147793 0.8196842,0.484189 1.1103782,0.788529 0.482258,-0.117153 0.928082,-0.4269 1.078193,-0.708067 0,-2.58e-4 -0.471509,-0.715277 -1.231072,-0.901176 -0.08278,-0.02369 -0.170225,-0.03778 -0.257479,-0.04023 z M 6.1606918,4.775219 C 5.895231,4.916832 5.6148364,5.329893 5.4848095,5.780996 c 0.2644309,0.223492 0.6365524,0.620203 0.812668,1.182794 0.032185,0.101962 0.050723,0.206434 0.06437,0.313803 L 7.0699143,6.569525 C 7.1147157,6.349638 7.1093086,6.115268 7.0377295,5.885597 6.8168125,5.178302 6.1606918,4.775219 6.1606918,4.775219 Z m 2.848361,0.885084 c -0.111231,-0.0046 -0.2260666,0.0082 -0.3379412,0.03218 L 7.9871831,6.376411 c 0.1112309,0.01648 0.2211744,0.04081 0.3218487,0.08046 0.390853,0.153458 0.844853,0.507878 1.134517,0.820715 C 9.8897598,7.146014 10.292907,6.864589 10.433233,6.601703 10.433491,6.601446 9.9390668,5.963606 9.3309018,5.724666 9.2300988,5.685016 9.1202838,5.664936 9.0090528,5.660296 Z M 4.9296206,6.00629 C 4.6618424,6.149191 4.3739166,6.564118 4.2456921,7.020114 4.5098655,7.244378 4.8830169,7.642633 5.05836,8.202908 5.090287,8.304869 5.109341,8.409599 5.12273,8.51671 L 5.8388433,7.800597 C 5.8839023,7.580195 5.8787523,7.346597 5.8066583,7.116668 5.5854838,6.409116 4.9296206,6.00629 4.9296206,6.00629 Z m 2.703529,0.868992 c -0.056388,0.0052 -0.1130333,0.02021 -0.1689706,0.03218 l -0.7080671,0.70002 c 0.1114884,0.01648 0.2211744,0.04081 0.3218487,0.08046 C 7.567943,7.880278 7.9742448,8.256262 8.204431,8.50061 8.6642884,8.373672 9.0826278,8.086519 9.2263008,7.816681 c 5.15e-4,0 -0.5022129,-0.638097 -1.1103782,-0.877038 C 7.9647181,6.880163 7.8023132,6.859583 7.6331496,6.875273 Z M 3.6905031,7.245408 C 3.3042847,7.451391 2.8647037,8.227046 2.9422049,8.870744 3.0479571,9.52748 3.4139408,9.852615 3.6985493,9.932844 l -2.6230668,2.631113 c -0.10067426,0.100932 -0.10067426,0.261148 0,0.36208 0.050208,0.04995 0.1191484,0.07242 0.185063,0.07242 0.065657,0 0.1268084,-0.02221 0.1770168,-0.07242 l 2.6391592,-2.631113 c 0.088517,0.287624 0.4106009,0.656978 1.0540545,0.740252 0.6436974,0.07699 1.4193527,-0.36208 1.6253359,-0.748298 0,-2.58e-4 -0.5022127,-0.638097 -1.110378,-0.877038 C 5.4441279,9.33054 5.2099508,9.33028 4.9859441,9.37766 l -0.9011764,0.901177 0,-0.36208 -0.3620797,0 0.8689914,-0.877038 C 4.6364804,8.819575 4.6393774,8.585719 4.5675404,8.355791 4.3463664,7.648491 3.6905031,7.245408 3.6905031,7.245408 Z m 2.7115752,0.860945 c -0.056339,0.0052 -0.1130332,0.02034 -0.1689705,0.03218 L 5.5169944,8.854646 c 0.1112309,0.01648 0.2131282,0.04081 0.3138025,0.08046 0.3004779,0.117926 0.8035918,0.46063 1.1264704,0.804622 0.4657794,-0.124362 0.8924864,-0.419047 1.037962,-0.691975 0,0 -0.5022127,-0.638097 -1.110378,-0.877037 C 6.7336468,8.111046 6.571097,8.090736 6.4020783,8.106346 Z"></path></g></svg>
       
      )
    },
    {
      step: '02',
      title: 'Καθημερινή Συγκομιδή',
      description: 'Μαζεύουμε τα προϊόντα την ημέρα της παράδοσης για μέγιστη φρεσκάδα.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      step: '03',
      title: 'Άμεση Διανομή',
      description: 'Απευθείας από τα χωράφια μας στο καλάθι και το πιάτο σας.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-linear-to-b from-[#1E2B20] via-[#2D4030] to-[#19241B] text-[#F9F6F0] relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-87.5 bg-[#E8A838]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 left-10 w-72 h-72 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-[#E8A838] font-bold text-xs rounded-full uppercase tracking-widest mb-4 shadow-sm">
            Η Διαδρομή
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Από το Κτήμα στο Σπίτι σας
          </h2>
          <p className="text-[#F9F6F0]/75 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Η δέσμευσή μας για αγνή, αυθεντική διατροφή σε 3 απλά στάδια χωρίς συμβιβασμούς στην ποιότητα.
          </p>
        </motion.div>

        {/* Timeline Grid Container */}
        <div className="relative">
          {/* Desktop Curved Dotted Connecting Line */}
          <div className="hidden md:block absolute top-11.25 left-[16%] right-[16%] h-0.5 pointer-events-none z-0">
            <svg className="w-full h-12 overflow-visible" fill="none">
              <path
                d="M 0 0 Q 250 30, 500 0 T 1000 0"
                stroke="rgba(232, 168, 56, 0.3)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle Node */}
                <div className="relative mb-8">
                  {/* Outer Pulsing Glow Effect */}
                  <div className="absolute -inset-2 bg-linear-to-r from-[#E8A838]/20 to-[#C86D51]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Central Circle */}
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 group-hover:border-[#E8A838] text-[#E8A838] flex items-center justify-center relative z-10 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8A838] group-hover:text-[#2D4030]">
                    {item.icon}
                  </div>

                  {/* Step Badge */}
                  <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 bg-[#C86D51] text-white font-mono text-[11px] font-bold rounded-full shadow-md z-20 border border-[#2D4030]">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="max-w-xs space-y-3">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E8A838] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#F9F6F0]/70 text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};