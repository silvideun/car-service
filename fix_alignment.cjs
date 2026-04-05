const fs = require('fs');
let code = fs.readFileSync('g:/car-service/src/App.tsx', 'utf8');

code = code.replace(
  /<section id="services" className="py-\[120px\] px-5 md:px-10 relative z-10">\s*<motion\.div \s*initial=\{\{ opacity: 0, y: 40 \}\}\s*whileInView=\{\{ opacity: 1, y: 0 \}\}\s*viewport=\{\{ once: true \}\}\s*className="mb-20"/g,
  `<section id="services" className="py-[120px] px-5 md:px-10 relative z-10">\n        <motion.div \n          initial={{ opacity: 0, y: 40 }}\n          whileInView={{ opacity: 1, y: 0 }}\n          viewport={{ once: true }}\n          className="mb-20 max-w-[1400px] mx-auto w-full"`
);

code = code.replace(
  /<section id="specs" className="py-\[120px\] px-5 md:px-10 relative z-10">\s*<motion\.div \s*initial=\{\{ opacity: 0, y: 40 \}\}\s*whileInView=\{\{ opacity: 1, y: 0 \}\}\s*viewport=\{\{ once: true \}\}\s*className="mb-20"/g,
  `<section id="specs" className="py-[120px] px-5 md:px-10 relative z-10">\n        <motion.div \n          initial={{ opacity: 0, y: 40 }}\n          whileInView={{ opacity: 1, y: 0 }}\n          viewport={{ once: true }}\n          className="mb-20 max-w-[1400px] mx-auto w-full"`
);

fs.writeFileSync('g:/car-service/src/App.tsx', code, 'utf8');
console.log('Fixed alignment.');
