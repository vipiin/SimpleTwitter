const root = document.getElementById('root');
let id=parseInt(localStorage.getItem('id')) || 1;
const modifytweet = document.getElementById('modifyItem');
const addTweetButton = document.querySelector('.addTweet');
const likedtweets = new Map(JSON.parse(localStorage.getItem('liketweets'))) || new Map();
console.log(likedtweets);
const liked = document.createElement('button');
liked.innerHTML = 'Go To Liked';
liked.id = 'goToLikedButton';
liked.addEventListener('click', () => {
  window.location.href = './likedtweet.html#liked';
})
let tweetList2;
tweetList2 = document.getElementById('liked');
let u = document.createElement('ul')
console.log(tweetList2);
const ltweets = JSON.parse(localStorage.getItem('liketweets')) || new Map();
console.log(ltweets);

// Add each tweet to the list
ltweets.forEach((tweetText, tweetId) => {
  console.log(tweetText[0],tweetText);
  u.appendChild(createTweetItem(tweetText[0], tweetText[1]));


});
if (tweetList2) {
  tweetList2.appendChild(u)

}

const b = document.getElementById('back');
if (b) {
  b.addEventListener('click', () => {
    window.history.back();
  })
}

const nav = document.getElementById('navigationButtons');
if (nav && likedtweets.size > 0) {
  nav.appendChild(liked);
  document.getElementById("goToLikedButton").style.display = "inline-block";
}
else {
  if (document.getElementById("goToLikedButton")) {
    document.getElementById("goToLikedButton").style.display = "none";
  }
}

let tweetMap = new Map();
let existingTweets = localStorage.getItem('tweets');
if (existingTweets) {
  tweetMap = new Map(JSON.parse(existingTweets));
}
console.log(tweetMap);
// tweetMap=localStorage.getItem('tweets')
// let id = Number(localStorage.getItem('id'));
console.log(id);
if (addTweetButton !== null) {
  addTweetButton.addEventListener('click', function () {
    window.location.href = 'addtweet.html#add';
  });
}
// let id = Number(localStorage.getItem('id'));

const saveChangesButton = document.getElementById('addsaveModifiedItemadd');
if (saveChangesButton) {
  saveChangesButton.addEventListener('click', addsaveChanges);
}
const addcancel = document.getElementById('addcancelModification');
if (addcancel) {
  addcancel.addEventListener('click', () => {
    window.location.href = './index.html'
  })
}

// function cancel(){
//   window.location.href = './index.html';
// }
function addsaveChanges() {
  if ((!isDuplicate(tweetMap, document.getElementById('addt').value) && document.getElementById('addt').value !== '')) {
    tweetMap.set(id, document.getElementById('addt').value);
    let tweetMapJson = JSON.stringify(Array.from(tweetMap.entries()));
    localStorage.setItem('tweets', tweetMapJson);
    id = id + 1;
    localStorage.setItem('id', String(id));
    console.log("working");
    window.location.href = './index.html';
  }

}
function addTwee() {

}
function isDuplicate(tweetMap, tweett) {
  for (const [id, tweet] of tweetMap.entries()) {
    if (tweet === tweett) {
      alert();
      return true;
    }
  }
  return false;
}
function alert() {
  // Get the alertMessage div and the alertMessageText span
  const alertMessage = document.getElementById("alertMessage");
  const alertMessageText = document.getElementById("alertMessageText");

  // Set the message text
  alertMessageText.textContent = "Error! You can't tweet about that";

  // Show the alertMessage div
  alertMessage.classList.remove("hidden");

  // Hide the alertMessage div after two minutes
  setTimeout(() => {
    alertMessage.classList.add("hidden");
  }, 2000);

}
function createTweetItem(tweetId, tweetText) {
  const tweetItem = document.createElement('li');
  const span = document.createElement('span');
  span.addEventListener('click',(e)=>{
    edittweet(e);
    
  })
  tweetItem.id = getKeyByValue(new Map(JSON.parse(localStorage.getItem('tweets'))), tweetText);
  span.textContent=tweetText;
  tweetItem.appendChild(span);
  console.log(tweetText);
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', function () {
    // tweetMap.delete(tweetId+1);
    // console.log(tweetMap);
    // console.log();
    // localStorage.setItem('tweets', JSON.stringify(Array.from(tweetMap.entries())));
    const data = JSON.parse(localStorage.getItem('tweets'));
    const lidata = JSON.parse(localStorage.getItem('liketweets'));
// Remove the 'class' property from the object
if(data){
  // call the function to remove an array with the first element of 2
  array = removeArrayByFirstElement(data, tweetId);
//   let n=String(tweetId)
//     delete data[n];
//     console.log(n);
//     console.log(data);
// let filtered=data.filter(function (value){
//   return value!=null;
// })
if(lidata){
array2=removeArrayByFirstElement(lidata,tweetId);
localStorage.setItem('liketweets',JSON.stringify(array2));
}
localStorage.setItem('tweets', JSON.stringify(array));
}

location.reload();
    // tweetItem.remove();
  });

  const likeButton = document.createElement('button');
  let arrayOfArrays = JSON.parse(localStorage.getItem('tweets'));
  let arrrlike=JSON.parse(localStorage.getItem('liketweets'));
  console.log(arrrlike);
  // let secondElements = arrayOfArrays.map(array => array[1]);
  // && Array.from(likedtweets.values()).includes(tweetText)
  // console.log(secondElements);
  //(localStorage.getItem('tweets') && JSON.parse(localStorage.getItem('tweets'))[tweetItem.id] && arrayOfArrays[tweetId] === tweetText) ||
  // console.log(arrrlike[tweetItem.id],tweetText);
  // if ( (localStorage.getItem('liketweets') && JSON.parse(localStorage.getItem('liketweets'))[tweetItem.id]===tweetText )) {
  //   console.log(tweetItem.id, tweetId, tweetText, JSON.parse(localStorage.getItem('liketweets'))[tweetItem.id]);
  //   console.log(JSON.parse(localStorage.getItem('liketweets'))[tweetItem.id]);
  //   console.log(tweetItem.id);
  //   console.log(likeButton);
  //   likeButton.textContent = 'Unlike';
  // } 
  // else 
  if(arrrlike){
    if(arrrlike.some(arr => arr[0] === tweetId)){
      likeButton.textContent = 'Unlike';
    }
    else {
      likeButton.textContent = 'Like';
    }
  }
  else{
    likeButton.textContent = 'Like';
  }
  
  likeButton.addEventListener('click', event => {
    // Implement your like button functionality here
    const li = event.target.closest('li');
    alertliked(li, likeButton);
    // location.reload();
    setTimeout(function(){
      location.reload();
   }, 2000);


  });
  tweetItem.appendChild(removeButton);
  tweetItem.appendChild(likeButton);
  return tweetItem;
}
let tweetList;
tweetList = document.getElementById('list');
const tweets = new Map(JSON.parse(localStorage.getItem('tweets'))) || new Map();
console.log(tweets);

// Add each tweet to the list
tweets.forEach((tweetText, tweetId) => {
  console.log(tweetId,tweetText);
  if (tweetList) {
    tweetList.appendChild(createTweetItem(tweetId, tweetText));
  }
});

function alertliked(e, likeButton) {
  console.log(likedtweets);
  // Get the alertMessage div and the alertMessageText span
  console.log(e);

  if (likeButton.textContent === "Like") {
    // likeButton.textContent = "Unlike";
    const alertMessage = document.getElementById("alertMessage");
    const alertMessageText = document.getElementById("alertMessageText");

    // Set the message text
    alertMessageText.textContent = `Hooray! You liked tweet with id ${Number(e.id)}!`;

    // Show the alertMessage div
    alertMessage.classList.remove("hidden");

    // Hide the alertMessage div after two minutes
    setTimeout(() => {
      alertMessage.classList.add("hidden");
    }, 2000);
    likedtweets.set(Number(e.id), tweetMap.get(Number(e.id)));
    let tweetMapJson = JSON.stringify(Array.from(likedtweets.entries()));
    localStorage.setItem('liketweets', tweetMapJson);
  } else {
    likeButton.textContent = "Like";
    const alertMessage = document.getElementById("alertMessage");
    const alertMessageText = document.getElementById("alertMessageText");

    // Set the message text
    alertMessageText.textContent = `Sorry you no longer like tweet with id ${Number(e.id)}!`;

    // Show the alertMessage div
    alertMessage.classList.remove("hidden");

    // Hide the alertMessage div after two minutes
    setTimeout(() => {
      alertMessage.classList.add("hidden");
    }, 2000);
    // likedtweets.set(Number(e.id)+1, tweetMap.get(Number(e.id)+1));
    likedtweets.delete(Number(e.id))
    console.log(Number(e.id));
    console.log(likedtweets);
    let tweetMapJson = JSON.stringify(Array.from(likedtweets.entries()));
    localStorage.setItem('liketweets', tweetMapJson);
  }

  if (document.getElementById('goToLikedButton')) {
    if (likedtweets.size > 0) {
      document.getElementById("goToLikedButton").style.display = "inline-block";
      // location.reload()
    }
    else {
      document.getElementById("goToLikedButton").style.display = "none";
    }
  }
}

function getKeyByValue(map, value) {
  for (let [key, val] of map.entries()) {
    if (val === value) {
      return key;
    }
  }
}

console.log(tweetMap);
console.log(likedtweets);

function edittweet(e){
  const spanText = e.target.textContent;
    const li = e.target.parentElement;
    const liId = li.id;
    window.location.href = `./edittweet.html?liId=${liId}&spanText=${encodeURIComponent(spanText)}#/edit/${liId}`;    
  }

const edte=document.getElementById('editt');
    // console.log(edte.value,edte);
    // console.log(edte.value);

    function removeArrayByFirstElement(arr, firstElement) {
      return arr.filter(item => item[0] !== firstElement);
    }
  