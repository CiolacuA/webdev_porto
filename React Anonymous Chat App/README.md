# EN
# Steps to use the application

 1. Set up the local MongoDB database for accounts and messages.
 2. Open the "start.bat" script
 3. Done! 😁
#

# Required programs:
1. MongoDB (local) - Windows(https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-5.0.9-signed.msi) or Mac(https://fastdl.mongodb.org/osx/ mongodb-macos-x86_64-5.0.9.tgz)

 After the local MongoDB server instance is installed, open a Command Prompt as Administrator and navigate to (default): "cd C:\Program Files\MongoDB\Server\5.0\bin", then type in the console: mongo - via this command will connect to the local MongoDB server and get the credentials, usually it is: "mongodb://127.0.0.1:27017/" or simply "mongodb://localhost:27017", address which you will need to add to the URI section in MongoDB Compass.


2. MongoDB Compass - is required for viewing the database in a more human form - Windows(https://downloads.mongodb.com/compass/mongodb-compass-1.32.2-win32-x64.exe) or Mac( https://downloads.mongodb.com/compass/mongodb-compass-1.32.2-darwin-x64.dmg)

 Once installed, establish a new connection "Connect > New Connection", a window will open where you will enter the above URI and press the "Connect" button

 At this point, you can start the application using "npm run dev". After the application has started and you are on the login page, press the "Refresh" button in MongoDB Compass and you will see that a new database called "chat" has been created with two data collections "users" and "messages".

 To have the current database, navigate to the "users" collection and a "Collection" option will appear at the top left of the program, click on Collection > Import Data (input type: JSON), select the users file .json from the program's db folder and you will press the "Import" button, then "Done".
## Congratulations, you can now use the program with a MongoDB database!


# In the login window you can log in with your database username and default password: 12345678 or create a new account.

# RO
# Pași folosire aplicație

 1. Setați baza de date MongoDB local pentru conturi și mesaje.
 2. Deschideți script-ul "start.bat"
 3. Gata! 😁
#

# Programe necesare:
1. MongoDB (local) - Windows(https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-5.0.9-signed.msi) sau Mac(https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.9.tgz)

    După ce s-a instalat instanța locală a serverului MongoDB, deschideți un Command Prompt ca Administrator și navigați la adresa (default): "cd C:\Program Files\MongoDB\Server\5.0\bin", după care scrieți în consolă: mongo - prin această comandă se va conecta la server-ul local MongoDB și se vor obține datele de conectare, de obicei este: "mongodb://127.0.0.1:27017/" sau pur și simplu "mongodb://localhost:27017", adresă pe care va trebui să o adăugați în secțiunea URI în MongoDB Compass.


2. MongoDB Compass - este necesar pentru vizualizarea bazei de date într-o formă mai umană - Windows(https://downloads.mongodb.com/compass/mongodb-compass-1.32.2-win32-x64.exe) sau Mac(https://downloads.mongodb.com/compass/mongodb-compass-1.32.2-darwin-x64.dmg)

    După ce s-a instalat, stabiliți o nouă conexiune "Connect > New Connection", se va deschide o fereastră unde se va introduce adresa URI de mai sus și se va apăsa pe butonul "Connect"

    În acest moment, puteți porni aplicația folosind "npm run dev". După ce s-a pornit aplicația și sunteți în pagina de logare, apăsați butonul "Refresh" în MongoDB Compass și veți vedea că s-a creat o bază de date nouă numită "chat" cu două colecții de date "users" și "messages".

    Pentru a dispune de baza de date curentă, navigați în colecția "users" și în partea de sus stânga a programului va apărea o opțiune "Collection", veți apăsa click pe Collection > Import Data (input type: JSON), veți selecta fișierul users.json din folderul db al programului și veți apăsa butonul "Import", apoi "Done".
## Felicitări, acum poți folosi programul cu o bază de date MongoDB!


# În fereastra de logare vă puteți autentifica cu numele de utilizator din baza de date și parola default: 12345678 sau puteți crea un cont nou.