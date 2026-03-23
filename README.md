# MedApp 💊

## ✅ COMO RODAR (passo a passo)

### 1. Abrir no VS Code
- Extraia o ZIP
- No VS Code: File → Open Folder → selecione a pasta `MedAppFinal`

### 2. Instalar dependências (UMA VEZ SÓ)
```powershell
npm install --legacy-peer-deps
```

### 3. Rodar o projeto
```powershell
npx expo start --tunnel --clear
```

### 4. Abrir no celular
- Abra o app **Expo Go** no iPhone
- Toque em **"Scan QR Code"**
- Escaneie o QR Code que aparece no terminal

---

## ⚠️ IMPORTANTE
- Sempre use `npm install --legacy-peer-deps` (nunca só `npm install`)
- Sempre use `npx expo start --tunnel --clear` para rodar
- Este projeto usa **Expo SDK 52** — compatível com Expo Go atual

## 📱 Telas incluídas
- Splash (tela inicial)
- Login
- Cadastro (passo 1 e 2)
- Home (medicamentos ativos/tomados)
- Cadastro de Medicamento
- Histórico de doses
- Calendário com horários
- Medicamentos Atuais
- Medicamentos Tomados
