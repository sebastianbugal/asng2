// function setup(){
//     doc=document.querySelectorAll(".norm");
//     for(d of doc){
//         d.addEventListener("click",function(){
//             this.style.background = 'rgb(101, 117, 112)';
//             var uid=document.getElementById('user_selected');
//             uid.textContent=this.id;
//             uid.value=this.id;
//             var ud=document.getElementById('user_selected_up');
//             ud.textContent=this.id;
//             ud.value=this.id;
//             var u=document.getElementById('user_selected_info');
//             u.textContent=this.id;
//             u.value=this.id;
//             doc=document.querySelectorAll(".norm");
//             for(d of doc){
//                 console.log(d.style.background)
//                 if((d.style.background=='rgb(101, 117, 112)' || d.style.background=='rgb(101, 117, 112) none repeat scroll 0% 0%') && d.id!=this.id ){
//                     console.log(d.dataset.col)
                    
//                     d.style.background=d.dataset.col;
//                 }
//             }

//         })    
//     }
    
// }
// setup();
function setup(){
    doc=document.querySelectorAll(".norm");
    for(d of doc){
        d.addEventListener("click",function(){
            this.style.border = '2px solid cyan';
            var uid=document.getElementById('user_selected');
            uid.textContent=this.id;
            uid.value=this.id;
            var ud=document.getElementById('user_selected_up');
            ud.textContent=this.id;
            ud.value=this.id;
            var u=document.getElementById('user_selected_info');
            u.textContent=this.id;
            u.value=this.id;
            doc=document.querySelectorAll(".norm");
            for(d of doc){
                if((d.style.border=='2px solid cyan' || d.style.background=='2px solid cyan none repeat scroll 0% 0%') && d.id!=this.id ){
                    
                    d.style.border="2px solid black"
                }
            }

        })    
    }
    
}
setup();