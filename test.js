let x = 2;
let y = 0;
let z = 1;
let a = [];
for (let i = 0; i < 3; i++) {
    for (let j = y; j < x; j++) {
        a.push(j);
        if (j === z) {
            y++;
            x++;
        }
        if(j === 3){
            x = 5;
        }
    }
    z++;
}
console.log(a);
