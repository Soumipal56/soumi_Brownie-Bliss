const fs = require('fs');
const path = require('path');
const dir = './public';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace <a href="index.html#contact">Contact</a>
  content = content.replace(/<a href="index\.html#contact">Contact<\/a>\s*<a href="contact\.html">Contact Us<\/a>/g, '<a href="contact.html">Contact</a>');
  content = content.replace(/<a href="contact\.html">Contact Us<\/a>\s*<a href="index\.html#contact">Contact<\/a>/g, '<a href="contact.html">Contact</a>');
  
  // If they are not right next to each other, remove index.html#contact entirely.
  content = content.replace(/<a href="index\.html#contact">Contact<\/a>\s*/g, '');
  content = content.replace(/<a href="contact\.html">Contact Us<\/a>/g, '<a href="contact.html">Contact</a>');

  fs.writeFileSync(filePath, content);
  console.log('Fixed', file);
}
