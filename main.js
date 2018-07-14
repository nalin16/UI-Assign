var notesList = new Array();

function init()
{

    if(typeof(Storage) !== "undefined") 
	{
        if(localStorage.getItem("notesList"))
		{
            notesList = JSON.parse(localStorage.getItem("notesList"));
        }
    }
    showList();
}


//The note Object
var note = 
{
    Title: "", 
    Desc: "", 
};


function saveNote()
{
    console.log("saveNote");
    var title = document.getElementById("title").value;
    var note = document.getElementById("note").value;
    var frm = document.getElementsByName("noteForm")[0];
    for (i = 0; i < notesList.length; i++) 
	{
        var noteInList = notesList[i];
        console.log(noteInList);
        if(noteInList.Title.toLowerCase() == title.toLowerCase())
		{
            alert('Title already exists.');
            frm.reset();
            return;
        } 
    }
    note = 
	{ 
        Title: title, 
        Desc: note, 
    };
    notesList.push(note);
    console.log(notesList);
    localStorage.setItem("notesList",JSON.stringify(notesList));
    alert('Note saved successfully!');
    showList();
    frm.reset();
}

function showList()
{
    var table = document.createElement("table");
    table.setAttribute("id", "ListOfNotes");
    var tableHead = document.createElement('thead');
    var titleTH = document.createElement('th');
    titleTH.width = "40%"
    var titleHeader = document.createTextNode("Title");
    titleTH.appendChild(titleHeader);
    var descTH = document.createElement('th');
    var descHeader = document.createTextNode("Description");
    descTH.width = "100%"
    descTH.appendChild(descHeader);
	var delTH = document.createElement('th');
	var delHeader = document.createTextNode("Delete");
    delTH.appendChild(delHeader);
	var editTH = document.createElement('th');
	var editHeader = document.createTextNode("Edit");
    editTH.appendChild(editHeader);
    tableHead.appendChild(titleTH);
    tableHead.appendChild(descTH);
	tableHead.appendChild(delTH);
	tableHead.appendChild(editTH);
    tableBody = document.createElement('tbody');
	//here
    for(i=0;i<notesList.length;i++) 
	{
        var tr = document.createElement("tr");
        var titleTD = document.createElement("td");
        var titleTxt = document.createTextNode(notesList[i].Title);
        titleTD.appendChild(titleTxt);
        tr.appendChild(titleTD);
        var descTD = document.createElement("td");
        var descTxt = document.createTextNode(notesList[i].Desc);
        descTD.appendChild(descTxt);
        tr.appendChild(descTD);
        title =notesList[i].Title.toLowerCase().replace(/\s/g,"_");
		console.log(title);
        var delTD = document.createElement("td");
        delTD.innerHTML = "<button onclick=\"deleteRow('"+title+"')\">Delete</button>";
        tr.appendChild(delTD);

        var editTD = document.createElement("td");
        editTD.innerHTML = "<button onclick=\"editRow('"+title+"')\">Edit</button>";
        tr.appendChild(editTD);
        tableBody.appendChild(tr);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    var div = document.getElementById("bottom-div");
    var tableNode = document.getElementById("ListOfNotes");
    div.removeChild(tableNode);
    div.appendChild(table);
}

function deleteRow(noteTitle)
{
    var r = confirm("You sure?");
	if (r == true) 
	{
		index = -1;
		for(i=0;i<notesList.length;i++)
		{
			if(notesList[i].Title.toLowerCase().replace(/\s/g,"_") == noteTitle)
			{
				index = i;
				break;
			}
		}
			if(index == -1)
			{
				return;
			}
		   
		notesList.splice(index,1);
		console.log(notesList);
		localStorage.setItem("notesList",JSON.stringify(notesList));
		alert("Deleted " +noteTitle+ "Succesfully!");
		showList();
	} 
	else 
	{
        return;
    }  
}

function editRow(noteTitle)
{
   var r = confirm("You sure?");
   if (r == true) 
  {
	index = -1;
    for(i=0;i<notesList.length;i++)
	{
        if(notesList[i].Title.toLowerCase().replace(/\s/g,"_") == noteTitle)
		{
            index = i;
            break;
        }
    }
    if(index == -1)
	{
        return;
    }
    noteToBeEdited = notesList.splice(index,1);
    console.log(notesList);
    localStorage.setItem("notesList",JSON.stringify(notesList));
    showList();
    document.getElementById("title").value = noteToBeEdited[0].Title;
    document.getElementById("note").value = noteToBeEdited[0].Desc;
  }
	else 
	{
        return;
    }  
}

function search() 
{
var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("ListOfNotes");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) 
  {
    titleTd = tr[i].getElementsByTagName("td")[0];
    descTd = tr[i].getElementsByTagName("td")[1];
	
    if (titleTd && descTd) 
	{
      if ((titleTd.innerHTML.toUpperCase().indexOf(filter) > -1))
	  {
        tr[i].style.display = "";
      } 
	  else 
	  {
        tr[i].style.display = "none";
      }
    } 
  }
}
