window.onload=function(){

    //Adds instructions to the control area
    let p = document.createElement('p');
    let text = document.createTextNode('To start a new puzzle or to reset the current one '
        +'Press the Reset Button.'+
        'You may preview the different puzzles by hovering over the buttons. '+
        'Note you may not preview other puzzles once you have started');
    p.appendChild(text);

    let control = document.getElementById('controls');
    control.insertBefore(p,control.childNodes[0]);

    //Create and adds buttons to the control area
    let a = document.createElement("BUTTON");
    let at = document.createTextNode("Waterfall");
    a.appendChild(at);

    let b = document.createElement("BUTTON");
    let bt = document.createTextNode("Forest");
    b.appendChild(bt);


	let c = document.createElement("BUTTON");
    let ct = document.createTextNode("Bridge");
    c.appendChild(ct);

    let d = document.createElement("BUTTON");
    let dt = document.createTextNode("Castle");
    d.appendChild(dt);

    let e = document.createElement("BUTTON");
    let et = document.createTextNode("Stream");
    e.appendChild(et);

    let f = document.createElement("BUTTON");
    let ft = document.createTextNode("Restart");
    f.appendChild(ft);


    control.appendChild(a);
    control.appendChild(b);
    control.appendChild(c);
    control.appendChild(d);
    control.appendChild(e);
    control.appendChild(f);

    ////////////////////////////////////////////////

    
    let starttime = 0;
    

    //creates the puzzle for viewing
    renderpuzzle('lime.jpg');
    
    //Adds the listeners to buttons in the control area
    let shuffle = document.getElementById('shufflebutton');
    shuffle.addEventListener('mouseover',function(){
        if(starttime==0){
            renderpuzzle('lime.jpg');
        }
    });

    shuffle.addEventListener('click', function(){
    	if(starttime===0){
    		starttime++;
            let pieces=renderpuzzle('lime.jpg');
    		pieces=shufflepieces(pieces);

    		pieces[0].forEach(function(tile){
        		let pos = Number(tile.innerHTML);
        		tile.addEventListener("mouseover",changeclass(pos,pieces,tile));
    		});

    		pieces[0].forEach(function(tile){
        		let pos = Number(tile.innerHTML);
        		tile.addEventListener("click",function(){
            		let value = 1;
            		return movetile(pos,pieces,tile,value)
        		});
    		});
    	}
    	else{
    		location.reload();
    	}
    });

    a.addEventListener('mouseover',function(){
        if(starttime==0){
            renderpuzzle('waterfall.jpg');
        }
    });

    a.addEventListener('click',function(){
        if(starttime===0){
            starttime++;
            let pieces=renderpuzzle('waterfall.jpg');
            pieces=shufflepieces(pieces);

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("mouseover",changeclass(pos,pieces,tile));
            });

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("click",function(){
                    let value = 1;
                    return movetile(pos,pieces,tile,value)
                });
            });
        }
        else{
            location.reload();
        }
    });

    b.addEventListener('mouseover',function(){
        if(starttime==0){
            renderpuzzle('forest.jpeg');
        }
    });

    b.addEventListener('click',function(){
        if(starttime===0){
            starttime++;
            let pieces=renderpuzzle('forest.jpeg');
            pieces=shufflepieces(pieces);

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("mouseover",changeclass(pos,pieces,tile));
            });

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("click",function(){
                    let value = 1;
                    return movetile(pos,pieces,tile,value)
                });
            });
        }
        else{
            location.reload();
            renderpuzzle('forest.jpeg');
        }
    });



    c.addEventListener('mouseover',function(){
        if(starttime==0){
            renderpuzzle('bridge.jpg');
        }
    });

    c.addEventListener('click',function(){
        if(starttime===0){
            starttime++;
            let pieces=renderpuzzle('bridge.jpg');
            pieces=shufflepieces(pieces);

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("mouseover",changeclass(pos,pieces,tile));
            });

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("click",function(){
                    let value = 1;
                    return movetile(pos,pieces,tile,value)
                });
            });
        }
        else{
            location.reload();
        }
    });

    d.addEventListener('mouseover',function(){
        if(starttime==0){
            renderpuzzle('castle.jpg');
        }
    });

    d.addEventListener('click',function(){
        if(starttime===0){
            starttime++;
            let pieces=renderpuzzle('castle.jpg');
            pieces=shufflepieces(pieces);

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("mouseover",changeclass(pos,pieces,tile));
            });

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("click",function(){
                    let value = 1;
                    return movetile(pos,pieces,tile,value)
                });
            });
        }
        else{
            location.reload();
        }
    });


    e.addEventListener('mouseover',function(){
        if(starttime==0){
            renderpuzzle('stream.jpg');
        }
    });

    e.addEventListener('click',function(){
        if(starttime===0){
            starttime++;
            let pieces=renderpuzzle('stream.jpg');
            pieces=shufflepieces(pieces);

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("mouseover",changeclass(pos,pieces,tile));
            });

            pieces[0].forEach(function(tile){
                let pos = Number(tile.innerHTML);
                tile.addEventListener("click",function(){
                    let value = 1;
                    return movetile(pos,pieces,tile,value)
                });
            });
        }
        else{
            location.reload();
        }
    });

    f.addEventListener('click',function(){
        starttime=0;
        location.reload();
    })
    ////////////////////////////////////////////////////////////////////////

}


function renderpuzzle(image){
    let doc = document.querySelectorAll('div');
    let number = 0;
    let top = 80;
    let left = 500;
    let time = 1;
    let int = 0;
    let x = 0;
    let y = 0;
    let t = '';
    let l = '';
    let emptytop = 0;
    let emptyleft= 0;
    let positions = new Array();
    let tiles = new Array();
    let emptyspace; 


    //Layout puzzle pieces
    doc.forEach(function(item,number){
        if(number > 1 && number <= 16){
            
            //Adds tiles to tile array
            tiles[time]=item;
            
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
            
            //Add the positions of the tile to an array
            positions[time]={'top':top,'left':left};
           
            
            //Set background position for images
            y=int;
            item.style.backgroundPositionY=-y+'px';
            
            item.style.backgroundPositionX=-x+'px';
            x+=100;
            
           
            
            //time keeps track of the current tile
            time++;
            
            //changes the position for the next tile
            left+=100;
            number++;
            
            //Changes the positions for the next row
            if((time-1)%4===0){
              top+=100;
                left=500;
                int +=100;
                x=0;
            }
            
            //Adds the empty space location to the array
            if(number===16){
                emptytop=+top;
                emptyleft=left+100;
                emptyspace={'emptytop':emptytop,'emptyleft':emptyleft};
            }
        }
    });
    
    return [tiles,positions,emptyspace];
}

//Shuffle puzzle pieces randomly
function shufflepieces(pieces){
	let n = pieces[1].length;
	for(let i = 1; i < n; i++){
		let r = i + parseInt(Math.random() * (n - i));
		swappieces(pieces[0][i],pieces[0][r],pieces[1][i],pieces[1][r]);
	}
    //Locate a random tile and swaps it with the last piece
    let last=Math.floor((Math.random()*15)+1);
    

    let temppostop=pieces[2]['emptytop'];
    let tempposleft=pieces[2]['emptyleft'];
    
    pieces[2]['emptytop']=pieces[1][last]['top'];
    pieces[2]['emptyleft']=pieces[1][last]['left'];
    
    pieces[1][last]['top']=temppostop;
    pieces[1][last]['left']=tempposleft;
    

    pieces[0][last].style.top=temppostop+'px';
    pieces[0][last].style.left=tempposleft+'px';
    
	return pieces;
}

//Swap pieces for the shuffle
function swappieces(tile1,tile2,value1,value2){
	let temptop = parseInt(tile2.style.top);
	let templeft = parseInt(tile2.style.left);

	tile2.style.top = parseInt(tile1.style.top)+"px";
	tile2.style.left = parseInt(tile1.style.left)+"px";

	tile1.style.top = temptop+"px";
	tile1.style.left = templeft+"px";

	let tempvaluetop = value2['top'];
	let tempvalueleft = value2['left'];

	value2['top']= value1['top'];
	value2['left'] = value1['left'];

	value1['top']=tempvaluetop;
	value1['left']= tempvalueleft;
}

//Test the moveability of a tile 
function moveabletest(currtop,freetop,currleft,freeleft){
    let value = '';
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


// helper function Adds moveable class 
function addmoveableclass(currtop,freetop,currleft,freeleft,tilepiece){
    if(moveabletest(currtop,freetop,currleft,freeleft)===true){
       return tilepiece.classList.add('movablepiece'); 
    }
}

//Remove moveable class
function removemoveableclass(tilepiece){
    return tilepiece.classList.remove('movablepiece');
}

//adds moveable class 
function changeclass(pos,pieces,tilepiece){   
    return addmoveableclass(pieces[1][pos]['top'],pieces[2]['emptytop'],
        pieces[1][pos]['left'],pieces[2]['emptyleft'],tilepiece)
}

//Swaps tile positions
function swaptilespos(tile,emptyvalue,currtilevalue,tilearray){
    
    
    let temptop = emptyvalue['emptytop'];
    let templeft = emptyvalue['emptyleft'];
    
    emptyvalue['emptytop'] = currtilevalue['top'];
    emptyvalue['emptyleft'] = currtilevalue['left'];
    
    currtilevalue['top'] = temptop;
    currtilevalue['left'] = templeft;
    
    tile.style.top=temptop+'px';
    tile.style.left=templeft+'px';
    
    return recalculate(tilearray);
}

//Retest tiles to see which tiles are moveable 
function recalculate(tilearray){

    tilearray[0].forEach(function(tile){
        tile.removeEventListener("mouseover",removemoveableclass(tile));
    });
    
    tilearray[0].forEach(function(tile){
        let pos = Number(tile.innerHTML);
        tile.removeEventListener("click",function(){
        let	value=0;
        });
    });
    
    tilearray[0].forEach(function(tile){
        let pos = Number(tile.innerHTML);
        tile.addEventListener("mouseover",changeclass(pos,tilearray,tile));
    });
}

function movetile(pos,tilearray,tile,click){
    if(moveabletest(tilearray[1][pos]['top'],tilearray[2]['emptytop'],tilearray[1][pos]['left'],
        tilearray[2]['emptyleft'])===true && click==1){
            return swaptilespos(tile,tilearray[2],tilearray[1][pos],tilearray);
    }
    else{
            return 0;
    }
}

