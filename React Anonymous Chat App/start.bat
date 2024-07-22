cd ".\server"
call installdependencies-sv.bat
cd "..\public"
call installdependencies-cl.bat
npm run dev