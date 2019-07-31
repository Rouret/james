var a;
$(document).ready(function(){
    var labyrinthe = new Labyrinthe()
    var james = new James()
    var jamesMove;
    a=labyrinthe.getAllData()
    $("#reload").click(function(){
        labyrinthe.draw()
        james.train(labyrinthe)
    })
    $("#move").click(function(){
    	james.train(labyrinthe)    	
    })
    $("#moves").click(function(){
        jamesMove = setInterval(function(){
    		james.train(labyrinthe)    
		}, 1);
		
    })
    $("#stop").click(function(){
         clearInterval(jamesMove)	
    })
    $("#brain").click(function(){
         james.getBrain()	
    })

   
})

