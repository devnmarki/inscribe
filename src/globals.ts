export const setBackgroundColor = () => {
    document.body.style.backgroundColor = "#F5F5F5";

    return () => {
        document.body.style.backgroundColor = "";
    };
}