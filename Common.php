<?php
// This file contains most php functions that are repeated for each page


// output head(bootstrap, js and css)
function out_head(){
    echo ("<head>");
    echo ("<title id='title'>Pac Game</title>");
    echo("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3' crossorigin='anonymous'>");
    echo('<link rel="stylesheet" type="text/css" href="css/style.css"');
    echo ("</head>");
}


// output header and login
function out_header(){
    echo ('<div id="header" class="row"">
    
        <div class="col-sm-5">

                <img id="menuBtn" src="img/triplBar.png" alt="" width="75" height="75" onclick="toggleMenu()">
                <img id="loginBtn" src="img/userLogo.png" alt="" width="60" height="60" onclick="toggleLogin()">
            
                
                <div class="row">');

    out_login();
    echo('</div>
                
        </div>
        <div class="col-sm-4">
                <h1>Pac  <img src="img/pac.png" alt=""width="40" height="40">  Game</h1>
        </div>
        <div class="col-sm-2"></div>
    </div>');
}

// output menu using 2d array
function out_menu(){
    $linkNames = ["Home" => "Index.php", 
        "Game" => "Game.php", 
        "Leaderboard" => "Leaderboard.php", 
        "Sign Up" => "SignUp.php"
    ];

    echo ('<div class="col" id="menu" style="display:none">');
    foreach (array_keys($linkNames) as $currName){
        echo ("
        <div class='row linkItems'>
            <a class='my-auto' href='$linkNames[$currName]'><center>$currName</center></a>
        </div>
        ");
    }
    echo("</div>");
}

// output login popup
function out_login(){
    echo('
        <div class="col-5 login-container" id="loginPopup" style="display:none">
            <div class="row"><p>Username</p></div>
            <div class="row"><input id="usernameLogin"></input></div>
            <div class="row"><p>Password</p></div>
            <div class="row"><input type="password" id="passwordLogin"></input></div>
            <div class="row"><button onclick="login()">Login</button></div>
        </div>
    ');
}

// output footer and bootstrap js
function out_footer(){
    echo ('
    <footer id="footer" class="fixed-bottom page-footer">
    <div class="row justify-content-center">
        <div class="col leftFoot">
            <div class="row justify-content-center"><p>Created by Hassan Maudarbocus</p></div>
            <div class="row"><a href="mailto:HM1014@live.mdx.ac.uk">HM1014@live.mdx.ac.uk</a></div>
        </div>
        <div class="col rightFoot">
            <p>This website is powered by Bootstrap 5</p>
        </div>
    </div>
    <div class="row justify-content-center">
    <div class="col bottFoot"><p>Copyright© 2021-2022 by HM1014. All rights reserved</p></div>
    </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    ');
    echo ('<script src="js/toggles.js"></script>');
    echo ('<script src="js/login.js"></script>');
}

// uses above functions to build a page taking the path to the html page to be displayed as argument
function buildPage($currPage){
    echo("
        <!DOCTYPE html>
        <html>
    ");

    out_head();

    echo("<body>");

    out_header();
    out_menu();
    echo("</body>");
    echo('<div id="pageContent">');
    include($currPage);
    echo('</div>');
    out_footer();
    
    echo("
        </html>
        ");
}

?>