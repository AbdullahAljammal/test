let save_button = document.getElementById("save_button");
let palette_name = document.getElementById("palette_name");
let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let color3 = document.getElementById("color3");
let palette_container = document.getElementById("saved_palettes_section");

let saved_palettes = JSON.parse(localStorage.getItem("palette_list")) || [];
localStorage.setItem("palette_list" , JSON.stringify(saved_palettes));
load_saved_palettes();
save_button.addEventListener("click" , () => {
    if(palette_name.value != ""){
        let palette = save_palette(palette_name.value , color1.value , color2.value , color3.value);
        add_palette_to_container(palette_name.value , color1.value , color2.value , color3.value , palette.id);
    }
})




function add_palette_to_container(palette_name , color1 , color2 , color3 , id){




    let div = document.createElement("div");
    let delete_button = document.createElement("button");


    delete_button.innerText = "Delete";
    delete_button.className = "delete_button";
    div.className = "palette_box";
    div.innerHTML = `
        <div class="palette_details">
          <span class="palette-name">${sanitize(palette_name)}</span>
          <div class="color_sample" style="background-color: ${color1}"></div>
          <div class="color_sample" style="background-color: ${color2};"></div>
          <div class="color_sample" style="background-color: ${color3};"></div>
        </div>
    `;

    div.appendChild(delete_button);
    delete_button.addEventListener("click" , () => {

        div.remove();
        delete_palette(id);
    })

    document.getElementById("saved_palettes_section").appendChild(div);
}

function sanitize(string){
    return string.replace(/[""'']/g , " ");
} 




function update_local_storage(){
    console.log(saved_palettes)
    localStorage.setItem("palette_list" , JSON.stringify(saved_palettes));
}


function save_palette(name , color1 , color2 , color3){
    let palette = {
        name: name,
        1: color1,
        2: color2,
        3: color3,
        id: generate_id()
    }
    saved_palettes.push(palette);
    update_local_storage();
    return palette;
}



function load_saved_palettes(){
    for(let i = 0; i < saved_palettes.length; i++){
        add_palette_to_container(saved_palettes[i].name , saved_palettes[i][1] , saved_palettes[i][2] , saved_palettes[i][3] , saved_palettes[i].id)
        console.log(saved_palettes[i].name , saved_palettes[i][1] , saved_palettes[i][2] , saved_palettes[3]);
    }
}






function generate_id(){
    return Math.floor(Math.random() * 9999999999999999999999999);
}

function delete_palette(id){
    
    saved_palettes = saved_palettes.filter(palette => palette.id != id);
    update_local_storage();
}