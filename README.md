# Hyre Application - Programming Project 1
##### Solution designed by Vincent Gallo (s3602478), Jeromy Cassar (s3717004), Rahul David (s3668008), Haowei Geng (s3554574)
##### Live deployed project = http://pp1-carshare.appspot.com/
##### GitHub = https://github.com/rmit-s3602478-vincent-gallo/ACMECarShare

##### Deliverables not implemented: Admin Dashboard

## INSTALLATION INSTRUCTIONS
### Backend 

#### Installing Required Packages  
1. Install Composer  
    - Go to the URL and follow the installation instructions: https://getcomposer.org/download/. This will be used to handle and install packages.  
2. Install Laravel  
    - Open your Command Prompt / Terminal and run the command shown in this URL: https://laravel.com/docs/4.2  

#### Deploying Application
1. Deploying the Laravel application to the backend service  
    - Follow the instructions in this URL:  
https://cloud.google.com/community/tutorials/run-laravel-on-appengine-flexible  

Be sure to add `service: backend` to your app.yaml file in the second line to make sure that it doesn't overwrite files in the default service.
Be careful not to add too many indents as this will cause an error when deploying.





### Front-end Service (ReactJs)
#### Installing Required Packages

1. Navigate to the following webpage `https://nodejs.org/en/download/` and download the installer for user OS (windows or mac). Run installer and follow through the installation process. Leave directories as default or as you wish.

2. Once NodeJs has been installed, verify its installation by opening PowerShell / Terminal (depending on OS) and run `node -v` and `npm -v`. Each packages version number should be printed to console, indicating a successful installation.

3. Clone project master branch into an empty folder on your computer.
(eg: __C/MyDrive/HyreApp/__)

4. Open cloned project in terminal or OS equivalent. Navigate to front-end folder.  
Command line directory should look like this:   (__C/MyDrive/HyreApp/ACMECarShare/frontend__).  
This is where a number of commands will be run to setup and configure the environment needed to deploy the application.

5. First command to be ran in command line is 
    - `npm install`  
      
    NPM will then install all required dependencies into project environment allowing the frontend to ready for deployment.  
    
#### Deploying Application

1. Navigate to frontend file directory (__C/MyDrive/HyreApp/ACMECarShare/frontend__) and run command `npm run build`. This will generate a folder called __build__ in which the compiled files will be included.

2. Naviagte to your google cloud platform storage bucket. Click upload folder button, in the file browser select the __build__ folder. (ie. __C/MyDrive/HyreApp/ACMECarShare/frontend/build__).

3. Create an app.yaml file on your computer, and using you favourite editor include 
```
  runtime: nodejs10  
  handlers:  

  - url: /(.*\..+)$  
    static_files: build/\1  
    upload: build/(.*\..+)$  
  
  - url: /.*  
    static_files: build/index.html  
    upload: build/index.html  
```
Save the file and upload to storage bucket.

4. Open cloud shell and enter following commands:  
a. `gcloud config set [PROJECT ID]` - This will allocate your powershell instance to the cloud environment.  
b. `mkdir HyreApp` - Create a directory inside cloud instance where build will be deployed from.  
c. `gsutil rsync -r gs://[PROJECT NAME] ./HyreApp` - Esnures build synchronisation is enabled.  
d. `cd HyreApp` - navigate to the build directory and finally run   
e. `gcloud app deploy` - where you will need to choose server location (Australia recommended). When asked to continue enter `y` and the deployment upload will begin.  
f. `gcloud app browse` - view your deployed application in a new tab.  
