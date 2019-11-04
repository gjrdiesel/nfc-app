# NFC App

This app takes in a CSV of members then lets you associate an RFID badge with each member
so that member can log in or log out with the badge.

This app will save the UID back to the member CSV as well as create a `signin.csv` so you will have
a log of all the people who have signed in.

<a href="https://www.youtube.com/watch?v=7-MVB1sp2Mg"><img src="images/example.gif"></a>

## Installation

Eventually I'd like to automate this in a script but for now, do the following commands:

```bash
# Log into your raspberry pi
ssh pi@192.168.1.203

# Make sure you're in the home directory
cd ~/

# Install some required software
sudo su

# Install NFC libraries
apt install libnfc-bin
apt install libpcsclite-dev
apt install pcscd

# Setup MySQL server
apt install mariadb-server
# No longer needed: Use 
# TablesPlus to import
# mysql -u root nfc --local-infile=1 < setup.sql

# Install Node 10
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# Install a "node server" (process manager)
npm install -g pm2

git clone https://github.com/gjrdiesel/nfc-app.git

# Go to new directory
cd nfc-app

# Install dependencies
npm install

# Start server
pm2 start bin/www --watch
pm2 save

# Make Chromium Start on Bootup
# Open this file:
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart

# Add this line:
/usr/bin/chromium-browser --disable-restore-session-state --kiosk http://localhost:3000/
```

### With installation complete

Visit http://your-pi-ip:3000 (Your Pi IP Address w/ Port 3000)

# Real member data
To use real member data with this app, replace `members/members.csv` with your own.

E.g. run this command from a folder on your computer that that has a `Member_Blank_UID_Export.csv`
```bash
scp Member_Blank_UID_Export.csv pi@192.168.168.1.203:~/nfc-app/members/members.csv
```
