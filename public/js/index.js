console.log('Index.js...');

function _onClick() {
    let span = document.getElementById('language_text');
    span.style.color = 'red';
}

let header = document.getElementById('header');
// header.style.backgroundColor = 'gray';

function scrollToTop () {
    alert('scroll to top...');
}

window.onscroll = function() {
    console.log('top:' + document.body.scrollTop);
    console.log('top2:' + document.documentElement.scrollTop);

    if (document.documentElement.scrollTop > 400) {
        document.getElementById('icon_scroll_top').style.display = 'block';
    }else {
        document.getElementById('icon_scroll_top').style.display = 'none';
    }
}

/**
 * Using jquery library:
 * Click button đổi màu chữ title
 * Togle nhiều thẻ p một lúc
 */

// javascript thuần:
console.log($);

function changeColor () {
    //alert('change color');
    //document.getElementById('jquery_title').style.color = 'red';
    //document.getElementById('jquery_title').style.display = 'none';

    console.log(document.getElementById('jquery_title').style.display);

    var h2Title = document.getElementById("jquery_title");
    if (h2Title.style.display === "none") {
        h2Title.style.display = "block";
    } else {
        h2Title.style.display = "none";
    }
}

// jquery

function toggleTitle () {
    let h2Title = $('#jquery_title');
    h2Title.toggle();
}

// javascript thuần:
// function togglePTags() {
//     //let pTags = document.getElementsByTagName('p');
//     //let pTags = document.getElementsByTagName('#demo_jquery p');

//     //let pTags = document.querySelector('#demo_jquery p');

//     let pTags = document.querySelectorAll('#demo_jquery p');
//     for(let i = 0; i < 3; i ++) {
//         if (pTags[i].style.display === 'none') {
//             pTags[i].style.display = 'block';
//         }else {
//             pTags[i].style.display = 'none';
//         }
//     }
//     console.log(pTags);
// }

// jquery
function togglePTags() { 
    let pTags = $('#demo_jquery p');
    pTags.toggle(1000);
}









