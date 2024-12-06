async function listOrders() {
    const orders = await getAllOrders();
    console.log("\nListe des commandes :");
    orders.forEach(order => {
        console.log(`- ${order.name} (${order.email})`);
    });
    return orders;
}