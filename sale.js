const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
const purchases = [];
const products = [
    { id: 1, name: "Mezcla original 200g", price: 500 },
    { id: 2, name: "Mezcla original 500g", price: 900 },
    { id: 3, name: "Mezcla especial 200g", price: 700 },
    { id: 4, name: "Mezcla especial 500g", price: 1200 },
];

function add() {
    const productId = parseInt(priceElement.value);
    const product = products.find((item) => item.id === productId);
    const number = parseInt(numberElement.value);

    const existingPurchase = purchases.find((item) => item.product.id === productId);

    if (existingPurchase) {
        existingPurchase.number += number;
    } else {
        purchases.push({ product, number });
    }

    window.alert(`${display()}\nSubtotal: ${subtotal()} Yenes`);
    resetFields();
}

function display() {
    return purchases
        .map((purchase) => {
            return `${purchase.product.name} ${purchase.product.price} Yenes por ${purchase.number} productos`;
        })
        .join("\n");
}

function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.product.price * purchase.number;
    }, 0);
}

function calcEnvioFromPurchase(sum) {
    return sum < 2000 ? 500 : sum < 3000 ? 250 : 0;
}

function calc() {
    const sum = subtotal();
    const envio = calcEnvioFromPurchase(sum);
    window.alert(
        `${display()}\nEl subtotal es ${sum} Yenes.\n
    Los gastos de envío son ${envio} Yenes.\n
    Total: ${sum + envio} Yenes.`
    );
    resetPurchase();
}

function resetFields() {
    priceElement.value = "";
    numberElement.value = "";
}

function resetPurchase() {
    purchases.length = 0;
    resetFields();
}
