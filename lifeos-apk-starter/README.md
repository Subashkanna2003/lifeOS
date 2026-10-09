# LifeOS Android Prototype (v0.1)

A mobile-first, interactive prototype for the LifeOS concept. Finance is represented by SpendSense. This is a demonstration app with sample data, not a production financial/medical service.

## Included
- LifeOS home and module navigation
- SpendSense sample monthly overview
- Dream-to-Ownership savings calculator
- Illustrative Financial Health Score concept
- Health, Fitness, Education & Career, Lifestyle, Assistant, Security screens
- Responsive phone layout and local demo interactions

## Run in VS Code
Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```
Open the local URL printed by Vite. To test a production web build:

```bash
npm run build
npm run preview
```

## Create an Android APK
A real APK requires Android SDK/build tools. VS Code alone does not compile APKs.

1. Install Android Studio (for Android SDK, platform tools and build tools) OR configure a trusted Android cloud build environment.
2. Install Node.js 20+ and ensure `JAVA_HOME` points to a supported JDK (JDK 21 is suitable for current Android toolchains, depending on the selected Gradle/AGP versions).
3. From this project directory run:

```bash
npm install
npx cap add android
npm run android:sync
```

4. With Android SDK and Gradle configured, build a debug APK:

```bash
cd android
./gradlew assembleDebug
```

On Windows PowerShell use:

```powershell
cd android
.\gradlew.bat assembleDebug
```

Expected output after a successful build: `android/app/build/outputs/apk/debug/app-debug.apk`.

You can install that APK on your Android device after allowing installation from the source you used to transfer it. For a release APK, configure signing securely; do not commit keystore files or passwords to source control.

## Before presenting
- Explain that the Health, Fitness, Learning and Lifestyle screens are concept demonstrations.
- The financial health score of 72 is illustrative and has no validated scoring formula yet.
- No live AI, bank integrations, investment execution, real authentication, encrypted backend, or production privacy controls are implemented.
- Do not enter real financial, health, password, OTP or bank data.
- Test the savings calculator with zero/negative values, a target lower than savings, very large numbers and invalid month counts.

## Suggested next development steps
1. Confirm module workflows with Anuraj.
2. Define the Financial Health Score formula and show users why the score changes.
3. Add proper authentication and a backend authorization model before handling real data.
4. Review privacy, consent, secure storage and applicable Indian financial/health requirements before integrating external providers.

## Option: Build APK in GitHub Actions (without installing Android Studio locally)
This repository includes `.github/workflows/android-apk.yml`.

1. Create a GitHub repository and upload/push this project source to the `main` branch.
2. Open the repository's **Actions** tab and choose **Build LifeOS Android APK**.
3. Select **Run workflow** (or let the workflow run after pushing to `main`).
4. Wait for the workflow to finish successfully.
5. Open the completed run and download the `LifeOS-debug-APK` artifact. Extract it to get `app-debug.apk`.

A GitHub account and successful cloud build are required. The resulting debug APK is for prototype demonstration, not Play Store release. Review build logs if a dependency or Android SDK version changes and causes a failure.
