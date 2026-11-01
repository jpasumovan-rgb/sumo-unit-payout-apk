SUMO UNIT PAYOUT - ANDROID APP  (ONE-TIME SETUP, about 10 minutes)
Same steps you used for the MM DOCs app.

1. Sign in at github.com. Click + > New repository. Name: sumo-unit-payout-apk. Public. Create.
2. On the empty repo page click "uploading an existing file".
   Unzip sumo-unit-payout-apk.zip on your computer and drag EVERYTHING inside the folder
   (app, settings.gradle, build.gradle, gradle.properties, .gitignore, .github) into the page.
   If the hidden ".github" folder does not upload: click Add file > Create new file, type
   .github/workflows/build-apk.yml  as the name, paste the contents of that file, Commit.
3. Click Commit changes. Open the "Actions" tab. "Build APK" runs by itself (about 4-6 minutes).
   A green check means it worked. (First time: click "I understand my workflows, enable them" if asked.)
4. Download link for operators (never changes):
   https://github.com/jpasumovan-rgb/sumo-unit-payout-apk/releases/download/apk/SUMO-Unit-Payout.apk
5. Send that link to your operators (Messenger / Viber).

UPDATING THE APP: nothing to do. The app opens your live Apps Script link, so every
"New version" you deploy there reaches all operators automatically.
Only if the /exec link changes: edit the APP_URL line in app/build.gradle on GitHub, commit,
wait for the green check, and operators install the new APK over the old one.

OPERATOR INSTALL (Android):
1. Tap the download link. If Chrome warns "this type of file can harm your device", tap Download anyway.
2. Open the downloaded file. If asked, tap Settings > allow "Install unknown apps" for Chrome, go Back.
3. Tap Install. If "Play Protect" warns, tap More details > Install anyway.
4. Open "Unit Payout" (the sumo icon). Log in with your email and the 6-digit code sent to it.

iPhone users: open the link in Safari, tap Share > Add to Home Screen.
