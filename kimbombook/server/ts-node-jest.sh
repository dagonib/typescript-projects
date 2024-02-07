#!/bin/bash
TSCONFIG_PATH="./tsconfig.json"
JEST_CONFIG_PATH="./jest.config.js"
PACKAGE_PATH="./package.json"

npm init -y
mkdir src
mkdir test
echo "Completada inicialización del node project y creación de carpeta."

#Instalaciones dependendias.
npm i -D @types/jest
npm i -D @types/node
npm i -D @typescript-eslint/eslint-plugin
npm i -D eslint-config-prettier 
npm i -D eslint-plugin-prettier
npm i -D jest
npm i -D nodemon
npm i -D prettier
npm i -D ts-jest
npm i -D ts-node
npm install --save-dev typescript
echo "Finalización de la instalación de dependencias."

#Inicializaciones
npx tsc --init
npx ts-jest config:init
echo "Finalización de la inicializaciones."

# Comprobamos si el archivo existe
if [ ! -f "$TSCONFIG_PATH" ]; then
  echo "El archivo no existe: $TSCONFIG_PATH"
  exit 1
fi
if [ ! -f "$JEST_CONFIG_PATH" ]; then
  echo "El archivo no existe: $JEST_CONFIG_PATH"
  exit 1
fi

# Configuración: tsconfig.json
sed -i 's|// "rootDir": "./",|"rootDir": "./",|g' "$TSCONFIG_PATH"
sed 's|// "resolveJsonModule": true,|"resolveJsonModule": true,|g' "$TSCONFIG_PATH"
sed -i 's|// "sourceMap": true,|"sourceMap": true,|g' "$TSCONFIG_PATH"
sed -i 's|// "outDir": "./",|"outDir": "./dist",|g' "$TSCONFIG_PATH"
# sed 's|// "removeComments": true,|"removeComments": true,|g' "$TSCONFIG_PATH"
# sed 's|// "preserveConstEnums": true,|"preserveConstEnums": true,|g' "$TSCONFIG_PATH"
# sed 's|// "noImplicitAny": true,|"noImplicitAny": true,|g' "$TSCONFIG_PATH"
echo "Finalización de la modificación de tsconfig.json."

# Configuración: jest.config.json
sed -i 's/testEnvironment: .node./&,\n  modulePathIgnorePatterns: \['\''\.\/dist'\''\]/' "$JEST_CONFIG_PATH"
echo "Finalización de la modificación de jest.config.json."

# Creación del archivo .prettierrc
echo "{
    \"semi\": true,
    \"trailingComma\": \"none\",
    \"singleQuote\": true,
    \"printWidth\": 80
}" >> .prettierrc
echo "Finalización de la creación de .prettierrc."

# Creación del archivo .prettierrc
echo "{
    \"root\": true,
    \"parser\": \"@typescript-eslint/parser\",
    \"plugins\": [
      \"@typescript-eslint\",
      \"prettier\"  ],
    \"extends\": [
      \"eslint:recommended\",
      \"plugin:@typescript-eslint/eslint-recommended\",
      \"plugin:@typescript-eslint/recommended\",
      \"prettier\"  ],
    \"rules\": {
      \"no-console\": 1,       // Means warning
      \"no-dupe-else-if\": 1,  // Means warning
      \"camelcase\": 1,        // Means warning
      \"no-ternary\":1,       // Means warning
      \"prettier/prettier\": [\"error\", {
        \"endOfLine\":\"auto\"
      }]
  }
}" >> .eslintrc
echo "Finalización de la creación de .eslintrc."

# Añadir scripts al package.json
nuevos_scripts='{
  "test": "npx jest",
  "prettier-format": "npx prettier --config .prettierrc 'src/**/*.ts' --write",
  "dev:watcher": "npx nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts",
  "test:watch": "jest --forceExit --watchAll",
  "dev:run": "npx ts-node src/index.ts",
  "build": "npx tsc"
}'
jq '.scripts = '"$nuevos_scripts" $PACKAGE_PATH > temp.json && mv temp.json $PACKAGE_PATH
sed -i 's|// "main": "index.js",|"main": "src/index.ts",|g' "$PACKAGE_PATH"
echo "Finalización de la modificación de package.json."

echo "describe('abc', () => {
    it('cbd', () => {
        expect(1).toBe(1);
    });
});" >> test/example.test.ts
echo "Finalización de la creación del test de ejemplo."

echo "INICIALIZACIÓN TERMINADA"