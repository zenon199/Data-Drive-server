
export function random(len: number) {
    let val = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let length = val.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += val[Math.floor((Math.random()*len))]
    }
    return ans;
}