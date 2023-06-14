export const addCourse = async (information) => {
    console.log(information)
    const responce = await fetch(`https://project12server-programmingherorubel.vercel.app/newcourse`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(information)
    })
    const result = responce.json()
    return result

}