const add = document.querySelector('.create');
function render(row,col){
	var content = "<table cellspacing ='0' cellpadding ='0' id='myTable'>";
	for(var i =0 ; i < row ; i++){
		if (i == 0) {
			for(var j = 0; j < col; j++){
				content += "<th>";
				content += "<button id='th' onclick='sortTable("+(j)+")'>"+(j+1)+"</button>";
				content += "</th>";
			}
		}	
		content += "<tr>";
		for(var j = 0; j < col; j++){
			content += "<td>";
			content += "<button  class='col'>"+Math.floor(Math.random() * (1000 - 100 + 1) + 100)+"</button >";
			content += "</td>";
		}
		content += "</tr>";				
	}
	content += "</table>";
	return content;
}

function sortTable(e) {
	  var table, rows, switching, i, x, y, shouldSwitch;
	  table = document.getElementById("myTable");
	  switching = true;
	  while (switching) {
	    switching = false;
	    rows = table.rows;
	    for (i = 1; i < (rows.length -1); i++) {
	      shouldSwitch = false;
	      x = rows[i].getElementsByTagName("TD")[e];
	      y = rows[i + 1].getElementsByTagName("TD")[e];
	      if (x.innerHTML > y.innerHTML) {
	        shouldSwitch = true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	    }
	  }
}
add.addEventListener('click',()=>{
	const row = document.getElementById("row").value;
	const col = document.getElementById("col").value;
	document.getElementById("main").innerHTML = render(row,col);
});