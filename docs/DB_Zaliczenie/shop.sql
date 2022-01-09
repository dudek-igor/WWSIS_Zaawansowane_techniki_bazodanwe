/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     08.01.2022 14:30:18                          */
/*==============================================================*/

drop table if exists Relationship_3;

drop table if exists Relationship_7;

drop table if exists articles;

drop table if exists brands;

drop table if exists categories;

drop table if exists categories_relations;

drop table if exists orders;

drop table if exists suppliers;

drop table if exists user_shop;

drop table if exists user_shop_addresses;

/*==============================================================*/
/* Table: Relationship_3                                        */
/*==============================================================*/
create table Relationship_3
(
   category_id          int not null,
   article_id           int not null,
   primary key (category_id, article_id)
);

/*==============================================================*/
/* Table: Relationship_7                                        */
/*==============================================================*/
create table Relationship_7
(
   article_id           int not null,
   order_id             int not null,
   sold_net_price       decimal(10,2),
   amount               int not null,
   primary key (article_id, order_id)
);

/*==============================================================*/
/* Table: articles                                              */
/*==============================================================*/
create table articles
(
   article_id           int not null AUTO_INCREMENT,
   brand_id             int,
   supplier_id          int,
   article_name_store   varchar(64),
   country_of_origin    varchar(2),
   ean_code             varchar(13),
   available            bool,
   net_price            decimal(10,2),
   purchase_price       decimal(10,2),
   primary key (article_id)
);

/*==============================================================*/
/* Table: brands                                                */
/*==============================================================*/
create table brands
(
   brand_id             int not null AUTO_INCREMENT,
   brand_name           varchar(64),
   primary key (brand_id)
);

/*==============================================================*/
/* Table: categories                                            */
/*==============================================================*/
create table categories
(
   category_id          int not null AUTO_INCREMENT,
   name                 varchar(64),
   primary key (category_id)
);

/*==============================================================*/
/* Table: categories_relations                                  */
/*==============================================================*/
create table categories_relations
(
   ancestor_i           int not null,
   descendant_i         int not null,
   depth                int,
   primary key (ancestor_i, descendant_i)
);

/*==============================================================*/
/* Table: orders                                                */
/*==============================================================*/
create table orders
(
   order_id             int not null AUTO_INCREMENT,
   users_shop_id        int not null,
   ordered_datetime     datetime,
   primary key (order_id)
);

/*==============================================================*/
/* Table: suppliers                                             */
/*==============================================================*/
create table suppliers
(
   supplier_id          int not null AUTO_INCREMENT,
   supplier_name        varchar(64),
   supplier_contact     varchar(64),
   primary key (supplier_id)
);

/*==============================================================*/
/* Table: user_shop                                             */
/*==============================================================*/
create table user_shop
(
   users_shop_id        int not null AUTO_INCREMENT,
   user_shop_email      varchar(128),
   user_shop_password   varchar(128),
   primary key (users_shop_id)
);

/*==============================================================*/
/* Table: user_shop_addresses                                   */
/*==============================================================*/
create table user_shop_addresses
(
   users_shop_addresses_id int not null AUTO_INCREMENT,
   users_shop_id        int not null,
   city                 varchar(64),
   post_code            varchar(6),
   street               varchar(64),
   builiding_number     varchar(16),
   flat_number          varchar(6),
   primary key (users_shop_addresses_id)
);

alter table Relationship_3 add constraint FK_Relationship_3 foreign key (category_id)
      references categories (category_id) on delete restrict on update restrict;

alter table Relationship_3 add constraint FK_Relationship_9 foreign key (article_id)
      references articles (article_id) on delete restrict on update restrict;

alter table Relationship_7 add constraint FK_Relationship_10 foreign key (order_id)
      references orders (order_id) on delete restrict on update restrict;

alter table Relationship_7 add constraint FK_Relationship_7 foreign key (article_id)
      references articles (article_id) on delete restrict on update restrict;

alter table articles add constraint FK_Relationship_4 foreign key (brand_id)
      references brands (brand_id) on delete restrict on update restrict;

alter table articles add constraint FK_Relationship_5 foreign key (supplier_id)
      references suppliers (supplier_id) on delete restrict on update restrict;

alter table categories_relations add constraint FK_Relationship_1 foreign key (ancestor_i)
      references categories (category_id) on delete restrict on update restrict;

alter table categories_relations add constraint FK_Relationship_2 foreign key (descendant_i)
      references categories (category_id) on delete restrict on update restrict;

alter table orders add constraint FK_Relationship_6 foreign key (users_shop_id)
      references user_shop (users_shop_id) on delete restrict on update restrict;

alter table user_shop_addresses add constraint FK_Relationship_8 foreign key (users_shop_id)
      references user_shop (users_shop_id) on delete restrict on update restrict;

