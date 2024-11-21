const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 입력 및 출력 폴더 설정
const inputFolder = 'input';
const outputFolder = 'output';

const quality = 80; // 이미지 품질 (0 ~ 100)

// 출력 폴더가 존재하지 않으면 생성
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// 폴더 생성 함수
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Folder created: ${folderPath}`);
  }
};

// 입력 및 출력 폴더가 존재하지 않으면 생성
ensureFolderExists(inputFolder);
ensureFolderExists(outputFolder);

// 파일 변환 로직
const convertImagesToWebP = (inputFolder, outputFolder) => {
  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error('Error reading input folder:', err);
      return;
    }

    files.forEach((file) => {
      const inputFilePath = path.join(inputFolder, file);
      const extName = path.extname(file).toLowerCase(); // 확장자 추출 및 소문자로 변환
      const baseName = path.basename(file, extName); // 확장자를 제외한 파일명

      // 지원하는 이미지 파일만 처리
      if (['.png', '.jpg', '.jpeg'].includes(extName)) {
        const outputFilePath = path.join(outputFolder, `${baseName}.webp`);

        sharp(inputFilePath)
          .webp({ quality })
          .toFile(outputFilePath)
          .then((info) => {
            console.log(`Converted ${file} to WebP:`, info);
          })
          .catch((error) => {
            console.error(`Error converting ${file}:`, error);
          });
      } else {
        console.log(`Skipping unsupported file: ${file}`);
      }
    });
  });
};

// 이미지 변환 함수 실행
convertImagesToWebP(inputFolder, outputFolder);
