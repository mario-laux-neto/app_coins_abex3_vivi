const fs = require('fs');
const path = require('path');

const colors = {
  PRIMARY_COLOR: "#6A0DAD",
  PRIMARY_COLOR_LIGHT: "#7E3FBF", 
  PRIMARY_COLOR_DARK: "#5D0C9B",
  ACCENT_COLOR: "#FFA500",
  WHITE_COLOR: "#FFFFFF",
  BLACK_COLOR: "#000000",
  TEXT_COLOR_DARK: "#333333",
  TEXT_COLOR_LIGHT: "#FFFFFF",
  TEXT_COLOR_MUTED: "#6c757d",
  LIGHT_BG_COLOR: "#F4F0F8",
  GREEN_SUCCESS: "#4CAF50",
  RED_ERROR: "#D32F2F"
};

function getAllFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss']) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files = files.concat(getAllFiles(fullPath, extensions));
    } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function checkColorUsage() {
  const projectRoot = process.cwd();
  const files = getAllFiles(projectRoot);
  const unusedColors = [];
  
  console.log('🔍 Verificando uso das cores...\n');
  
  for (const [colorName, colorValue] of Object.entries(colors)) {
    let isUsed = false;
    const usageFiles = [];
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes(colorName) || content.includes(colorValue)) {
          isUsed = true;
          usageFiles.push(path.relative(projectRoot, file));
        }
      } catch (error) {
        // Ignora erros de leitura
      }
    }
    
    if (!isUsed) {
      unusedColors.push({ name: colorName, value: colorValue });
    } else {
      console.log(`✅ ${colorName}: usado em ${usageFiles.length} arquivo(s)`);
      usageFiles.forEach(file => console.log(`   - ${file}`));
    }
  }
  
  if (unusedColors.length > 0) {
    console.log('\n❌ Cores não utilizadas:');
    unusedColors.forEach(color => {
      console.log(`   - ${color.name} (${color.value})`);
    });
  } else {
    console.log('\n✅ Todas as cores estão sendo utilizadas!');
  }
}

checkColorUsage();
