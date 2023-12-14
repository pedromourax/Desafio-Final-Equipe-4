create database pvd;

create table usuarios(
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
);

create table categorias(
    id serial primary key,
    descricao text
);

insert into categorias
(descricao)
values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games')

create table produtos (
    id serial primary key,
    descricao text,
    quantidade_estoque int not null,
    valor int not null,
    categoria_id int references categorias(id)
);

create table clientes (
    id serial primary key,
    nome text not null,
    email text not null unique,
    cpf text not null unique,
    cep int,
    rua text,
    numero int,
    bairro text,
    cidade text,
    estado text
);

alter table produtos add cloumn produto_imagem TEXT;

create table pedidos (
	id serial primary key,
    cliente_id int references clientes(id),
    observacao text,
    valor_total int not null
);

create table pedido_produtos(
	id serial primary key,
    pedido_id int references pedidos(id),
    produto_id int references produtos(id),
    quantidade_produto int not null,
    valor_produto int not null
);