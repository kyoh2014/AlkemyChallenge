export default function dateReformat(date){
// 2022-10-11T13:06:00.000Z 
// 2022/10/11 13:06hs
    let reformatDate = ""
    reformatDate += date.substring(0,4) + "/"
    reformatDate += date.substring(5,7) + "/"
    reformatDate += date.substring(8,10) + " "
    reformatDate += date.substring(11,16) + "hs"
    return reformatDate
}
