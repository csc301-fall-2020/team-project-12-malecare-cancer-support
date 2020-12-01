import React from "react";
import "./matching.css";
import 'bootstrap/dist/css/bootstrap.min.css';

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"></link>

/* Landing page component */
class Matching extends React.Component {
  render() {
    return (
      <div class="main no-gutters">
<div class="col h-100">
      <div class="row top no-gutters menuContainer">
        <div class="col-3 navigation bigRightBorder"><img class="menuIcon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ2My41OSA0NjMuNTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQzNi44MTMsMEgyNi43NzRDMTIuNDExLDAsMC43NjUsMTEuNjQ2LDAuNzY1LDI2LjAxczExLjY0NiwyNi4wMSwyNi4wMSwyNi4wMWg0MTAuMDM5ICAgIGMxNC4zNjUsMCwyNi4wMTItMTEuNjQ2LDI2LjAxMi0yNi4wMVM0NTEuMTc5LDAsNDM2LjgxMywweiIgZmlsbD0iI2U3NGIxYSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik00MzYuODEzLDEzNC42NEgyNi43NzRjLTE0LjM2NCwwLTI2LjAxLDExLjY0Ni0yNi4wMSwyNi4wMXMxMS42NDYsMjYuMDEsMjYuMDEsMjYuMDFoNDEwLjAzOSAgICBjMTQuMzY1LDAsMjYuMDEyLTExLjY0NiwyNi4wMTItMjYuMDFTNDUxLjE3OSwxMzQuNjQsNDM2LjgxMywxMzQuNjR6IiBmaWxsPSIjZTc0YjFhIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CgkJPHBhdGggZD0iTTQzNi44MTMsMjY5LjI3OUgyNi43NzRjLTE0LjM2NCwwLTI2LjAxLDExLjY0Ni0yNi4wMSwyNi4wMWMwLDE0LjM2NSwxMS42NDYsMjYuMDEyLDI2LjAxLDI2LjAxMmg0MTAuMDM5ICAgIGMxNC4zNjUsMCwyNi4wMTItMTEuNjQ2LDI2LjAxMi0yNi4wMTJDNDYyLjgyNSwyODAuOTI2LDQ1MS4xNzksMjY5LjI3OSw0MzYuODEzLDI2OS4yNzl6IiBmaWxsPSIjZTc0YjFhIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CgkJPHBhdGggZD0iTTQzNi44MTMsNDExLjU3SDI2Ljc3NGMtMTQuMzY0LDAtMjYuMDEsMTEuNjQ2LTI2LjAxLDI2LjAxczExLjY0NiwyNi4wMSwyNi4wMSwyNi4wMWg0MTAuMDM5ICAgIGMxNC4zNjUsMCwyNi4wMTItMTEuNjQ2LDI2LjAxMi0yNi4wMVM0NTEuMTc5LDQxMS41Nyw0MzYuODEzLDQxMS41N3oiIGZpbGw9IiNlNzRiMWEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+" /></div>
        <div class="col">
          <div class="row logoAndMode">
            <div class="col-7 logo">CancerChat</div>
            <div class="col-1"></div>
            <div class="col-2">Mentor</div>
            <div class="col-2">Love</div>
          </div>
        </div>
      </div>
      <div class="row bottom no-gutters">
        <div class="col-3 likes">
          <div class="row no-gutters likesOrMessages">
            <div class=" col no-gutters rightBorder"><text class="center bold">Likes<text class="numLikes">1</text></text></div>
            <div class="col no-gutters bigRightBorder"><text class="center">Messages <text class="numLikes">99+</text></text></div>
          </div>
          <div class="likesMessages bigRightBorder">Space for Likes and Messages</div>
        </div>
        <div class="col">
          <div class="row-10 bioAndPhoto">
          <div class="row no-gutters h-100">
            <div class="col-sm-12 col-md-6 flex">
              
              
              
              
            <div id="plzwork" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="https://images.pexels.com/photos/3226584/pexels-photo-3226584.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="First slide"></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://www.liveabout.com/thmb/jyBQcDiXM_ysKfIHu88GvvW-20U=/1300x866/filters:no_upscale():max_bytes(150000):strip_icc()/loan-599c450a03f40200117e717a.jpg" alt="Second slide"></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://cdn.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg" alt="Third slide"></img>
    </div>
  </div>
  <a class="carousel-control-prev" href="#plzwork" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#plzwork" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>        
              


{/* 
https://images.pexels.com/photos/3226584/pexels-photo-3226584.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
https://www.liveabout.com/thmb/jyBQcDiXM_ysKfIHu88GvvW-20U=/1300x866/filters:no_upscale():max_bytes(150000):strip_icc()/loan-599c450a03f40200117e717a.jpg
https://cdn.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg */}

              
</div>
            <div class="col-sm-12 col-md-6 bioContainer">
             <text class="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus nec quam non viverra. Vivamus ultrices augue a velit ullamcorper placerat. Ut vel lectus tortor. Vestibulum consequat dui a condimentum pulvinar. Vestibulum ac congue mi. Sed iaculis luctus placerat. Sed nec mauris condimentum, lobortis purus et, bibendum ex. Mauris scelerisque rhoncus quam, et lobortis libero dictum sit amet. Vivamus scelerisque est sem, a elementum est bibendum et. Aenean sit amet ornare arcu. Aliquam id enim neque. Nulla blandit, enim vitae dignissim sagittis, sapien nisl finibus diam, ac convallis nisi arcu ut lorem. Curabitur viverra a urna non faucibus. Mauris eu enim mattis, commodo nibh non, posuere felis. Nulla facilisi.

Proin sagittis neque a ligula efficitur, vel malesuada massa commodo. Phasellus iaculis, sem ut auctor sollicitudin, elit risus dictum quam, et volutpat augue lacus ut lectus. Mauris dignissim pretium fermentum. Morbi fermentum erat ac velit tincidunt sollicitudin. Donec gravida ipsum elit, at luctus massa aliquam sed. Ut tristique magna vitae magna consectetur, sed congue leo consectetur. Quisque in viverra justo. Etiam vestibulum dolor eu odio suscipit, ac sodales augue tincidunt. Proin porta, purus non hendrerit volutpat, lacus eros gravida sapien, nec aliquam sapien quam fringilla lectus. Nullam non mauris nibh. Suspendisse efficitur eros non turpis vestibulum commodo. Donec venenatis neque vel dapibus efficitur.
        </text></div></div>
          </div>
          <div class="row-2 likeOrPass">Like Pass</div>
        </div>
      </div>
    </div></div>




    );
  }
}

export default Matching;





// Fonts - I used Roboto
// Between Roboto light - Roboto medium
// Colors: #E74B1A and #C4C4C4