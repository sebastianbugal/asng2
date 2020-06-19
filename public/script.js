function setup(){
    doc=document.querySelectorAll(".norm");
    for(d of doc){
        d.addEventListener("click",function(){
            this.style.background = 'rgb(101, 117, 112)';
            var uid=document.getElementById('user_selected');
            uid.textContent=this.id;
            uid.value=this.id;
            doc=document.querySelectorAll(".norm");
            for(d of doc){
                if(d.style.background=='rgb(101, 117, 112)' && d.id!=this.id ){
                    console.log('h12312i')
                    d.style.background='aquamarine';
                }
            }

        })    
    }
    
}
setup();