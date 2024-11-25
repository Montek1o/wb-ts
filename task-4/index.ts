interface IProduct {
    id: number;
    name: string;
    price: number;
}

class Product implements IProduct {
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

type Status = 'Pending' | 'Shipped';

interface IOrder {
    id: number;
    products: IProduct[];
    total: number;
    status: Status;
    changeStatus(newStatus: Status): void;
}

class Order implements IOrder {
    id: number;
    products: IProduct[];
    total: number;
    status: Status;

    constructor(id: number, products: IProduct[], total: number) {
        this.id = id;
        this.products = products;
        this.total = total;
        this.status = 'Pending';
    }

    changeStatus(newStatus: Status) {
        this.status = newStatus;
    }
}

class Cart {
    items: Product[] = [];

    addProduct(product: IProduct) {
        this.items.push(product);
        console.log(`Товар ${product.name} добавлен в корзину.`);
    }

    removeProduct(productId: number) {
        this.items = this.items.filter(item => item.id !== productId);
        console.log(`Товар с ID ${productId} удален из корзины.`);
    }

    getProducts(): IProduct[] {
        return this.items;
    }

    clear() {
        this.items = [];
        console.log(`Корзина очищена.`);
    }

    getTotal(): number {
        return this.items.reduce((total, product) => total + product.price, 0);
    }
}

class OrderManager {
    orders: IOrder[] = [];

    createOrder(products: IProduct[]): IOrder {
        const total = products.reduce((sum, product) => sum + product.price, 0);
        const order: IOrder = new Order(this.orders.length + 1, products, total);
        this.orders.push(order);
        console.log(`Заказ с ID ${order.id} создан. Общая сумма: ${order.total}`);
        return order;
    }

    changeOrderStatus(orderId: number, newStatus: Status) {
        // @ts-ignore
        const order: IOrder = this.orders.find((o: IOrder) => o.id === orderId);
        if (order) {
            order.changeStatus(newStatus);
            console.log(`Статус заказа с ID ${orderId} изменен на ${newStatus}.`);
        } else {
            console.log(`Заказ с ID ${orderId} не найден.`);
        }
    }

    public getOrders(): Order[] {
        return this.orders;
    }
}

class ProductManager {
    private products: IProduct[] = [];

    public addProduct(product: IProduct) {
        this.products.push(product);
        console.log(`Товар ${product.name} добавлен в систему.`);
    }

    public removeProduct(productId: number) {
        this.products = this.products.filter(product => product.id !== productId);
        console.log(`Товар с ID ${productId} удален из системы.`);
    }

    public getProducts(): IProduct[] {
        return this.products;
    }
}

// Пример использования
const productManager = new ProductManager();
const orderManager = new OrderManager();
const cart = new Cart();

// Добавление товаров
const product1 = new Product(1, 'Товар 1', 100);
const product2 = new Product(2, 'Товар 2', 200);
productManager.addProduct(product1);
productManager.addProduct(product2);

// Просмотр всех товаров
console.log('Доступные товары:', productManager.getProducts());

// Добавление товаров в корзину
cart.addProduct(product1);
cart.addProduct(product2);

// Просмотр текущей корзины
console.log('Текущая корзина:', cart.getProducts());
console.log('Итоговая сумма:', cart.getTotal());

// Создание заказа
const order = orderManager.createOrder(cart.getProducts());

// Изменение статуса заказа
orderManager.changeOrderStatus(order.id, 'Shipped');

// Просмотр всех заказов
console.log('Все заказы:', orderManager.getOrders());

// Очистка корзины
cart.clear();
