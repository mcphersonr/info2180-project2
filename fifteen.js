window.onload=function (){

    /*Extra feature added multiple backgrounds 
        and the ability to select any one of them

    */
    let images=[Array('Lime','lime.jpg'),
            Array('Castle','castle.jpg'),
            Array('Stream','stream.jpg'),
            Array('Waterfall','waterfall.jpg'),
            Array('Bridge','bridge.jpg'),
            Array('Forest','forest.jpeg')];

    //Creates drop down box        
    let select = document.createElement("SELECT");
    select.setAttribute("id","Images");

    for (let m=0; m<images.length;m++){
        let opt=document.createElement("option");
        opt.setAttribute("value",images[m][1]);
        opt.appendChild(document.createTextNode(images[m][0]));
        select.appendChild(opt);
    }


    //Create button for selecting drop down box   
    let a = document.createElement("BUTTON");
    a.setAttribute('id','puzzle');
    let at = document.createTextNode("Select Puzzle");
    a.appendChild(at);
    let p = document.createElement('p');
    let notes = document.createTextNode('Press Shuffle to start');
    let notes2 = document.createTextNode('Press Select Puzzle to change the puzzle image then press shuffle twice to start');
    p.appendChild(notes);
    p.appendChild(document.createElement('BR'));
    p.appendChild(notes2);

    //Add drop down box and button to the control area 
    let control=document.getElementById('controls');
    control.appendChild(select);
    control.appendChild(a);
    control.appendChild(p);


    let starttime = 0;
    let randompic = ''

    //Generates random pic for puzzle creation
    let random=Math.floor((Math.random()*5)+0);
    randompic= images[random][1];

    //creates the puzzle for viewing
    renderpuzzle(randompic);

    let emptytop='';
    let emptyleft='';

    let puzzlselect = document.getElementById('puzzle');
    puzzlselect.addEventListener('click', function(){
       if(starttime>0){
            randompic=document.getElementById('Images').value;
            return resetpieces(randompic);
       } 
    });

    //Adds the listeners to buttons in the control area
    let shuffle = document.getElementById('shufflebutton');
    shuffle.addEventListener('click', function(){ 

        starttime++;

        let pieces=renderpuzzle(randompic);
        emptytop=pieces['emptytop'];
        emptyleft=pieces['emptyleft'];

        pieces=shufflepieces(emptytop,emptyleft);
        emptytop=pieces[0];
        emptyleft=pieces[1];


        let doc= document.getElementById('puzzlearea');
        let v=doc.querySelectorAll('div');
        v.forEach(function(tile){
            tile.addEventListener("mouseover",addmoveableclass(tile,emptytop,emptyleft));
        });

        v.forEach(function(tile){
            tile.addEventListener("click",function(){
                if(moveabletest(tile,emptytop,emptyleft)===true){
                    let space= movetile(tile,emptytop,emptyleft);
                    emptytop=space[0];
                    emptyleft=space[1]
                    recalculate(emptytop,emptyleft);
                }
            });
        });
    });
    
}


function renderpuzzle(image){
    let number = 1;
    let top = 80;
    let left = 500;
    let int = 0;
    let x = 0;
    let y = 0;
    let t = '';
    let l = '';
    let emptytop = 0;
    let emptyleft= 0; 
    let emptyspace;

    let doc= document.getElementById('puzzlearea');
    let v=doc.querySelectorAll('div');
    
    //Layout puzzle pieces
    v.forEach(function(item){
            
            //Adds puzzle piece class
            item.classList.add('puzzlepiece');
            
            //changes the backgroundimage of each tile
            item.style.backgroundImage="url("+image+")";

            //Changes position of current style
            item.style.position='fixed';
            
            //takes top value and adds px so html can interpet it
            t=top;
            item.style.top=t+='px';
            
            //takes left value and adds px so html can interpet it
            l=left;
            item.style.left=l+='px';
            
            //Set background position for images
            y=int;
            item.style.backgroundPositionY=-y+'px';
            
            item.style.backgroundPositionX=-x+'px';
            x+=100;
            
            //changes the position for the next tile
            left+=100;
            number++;
            
            //Changes the positions for the next row
            if((number-1)%4===0){
              top+=100;
                left=500;
                int +=100;
                x=0;
            }
            
            //Adds the empty space location to the array
            if(number===15){
                emptytop=+top;
                emptyleft=left+100;
                emptyspace={'emptytop':emptytop+'px','emptyleft':emptyleft+'px'};
            }
        });
    
    return emptyspace;
}

function resetpieces(randompic){
    let doc= document.getElementById('puzzlearea');
    let v=doc.querySelectorAll('div');

    v.forEach(function(tile){
        tile.style.top='0 px';
        tile.style.left='0 px';
        tile.removeEventListener('mouseover',removemoveableclass(tile));
        tile.classList.remove('puzzlepiece');
        tile.removeEventListener('click',removeclick());
    });
    return renderpuzzle(randompic);
}


//Shuffle puzzle pieces randomly
function shufflepieces(emptytop,emptyleft){
    let doc= document.getElementById('puzzlearea');
    let v=doc.querySelectorAll('div');
   
    let n = v.length;
    for(let i = 0; i < n; i++){
        let r = i + parseInt(Math.random() * (n - i));
        swappieces(v[i],v[r]);
    }

    //Locate a random tile and swaps it with the last piece
    let last=Math.floor((Math.random()*14)+0);
    return freetileswap(v[last],emptytop,emptyleft);
} 

//Swap pieces for the shuffle
function swappieces(tile1,tile2){
    let temptop = tile2.style.top;
    let templeft = tile2.style.left;

    tile2.style.top = tile1.style.top;
    tile2.style.left = tile1.style.left;

    tile1.style.top = temptop;
    tile1.style.left = templeft;

}

//Test the moveability of a tile 
function moveabletest(tile,freetop,freeleft){
    let value = '';
    let currtop=parseInt(tile.style.top);
    freetop=parseInt(freetop);
    let currleft=parseInt(tile.style.left);
    freeleft=parseInt(freeleft);
    //left tile freetop-currtop =0 and freeleft - currleft = 100
    //right tile freetop-currtop =0 and freeleft - currleft = -100
    //bottom tile freetop-currtop =-100 and freeleft - currleft = 0
    //top freetop - currtop =100 and freeleft-currleft = 0
    if((freetop-currtop===0 && freeleft-currleft===100) || 
        (freetop-currtop===0 && freeleft-currleft===-100) || 
        (freetop-currtop===-100 && freeleft-currleft===0) || 
        (freetop-currtop===100 && freeleft-currleft===0)){
       value = true;
    }
    
    else{
      value = false;
    }

    return value;   
}

//Retest tiles to see which tiles are moveable 
function recalculate(emptytop,emptyleft){
    let doc= document.getElementById('puzzlearea');
    let v=doc.querySelectorAll('div');

    v.forEach(function(tile){
        tile.removeEventListener("mouseover",removemoveableclass(tile));
    });
    
    v.forEach(function(tile){
        tile.addEventListener("mouseover",addmoveableclass(tile,emptytop,emptyleft));
    });
}

// helper function Adds moveable class 
function addmoveableclass(tilepiece,freetop,freeleft){
    if(moveabletest(tilepiece,freetop,freeleft)===true){
       return tilepiece.classList.add('movablepiece'); 
    }
}

//Remove moveable class
function removemoveableclass(tilepiece){
    return tilepiece.classList.remove('movablepiece');
}

//Swaps tile positions
function freetileswap(tile,freetop,freeleft){
    let temptop = freetop;
    let templeft = freeleft;

    freetop=tile.style.top;
    freeleft=tile.style.left;

    tile.style.top = temptop;
    tile.style.left = templeft; 

    return [freetop,freeleft]; 
}

function removeclick(){
    let value = false;
    return value;
}

function movetile(tile,freetop,freeleft){
    return freetileswap(tile,freetop,freeleft);
}
