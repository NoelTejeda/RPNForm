PGDMP     )                    |            crudReactNode    14.5    14.5     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    25325    crudReactNode    DATABASE     k   CREATE DATABASE "crudReactNode" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "crudReactNode";
                postgres    false            �            1259    25327 	   empleados    TABLE     �  CREATE TABLE public.empleados (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    edad integer NOT NULL,
    pais character varying(50) NOT NULL,
    cargo character varying(50) NOT NULL,
    experiencia integer NOT NULL,
    residencia character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    telefono character varying(50)
);
    DROP TABLE public.empleados;
       public         heap    postgres    false            �            1259    25326    empleados_id_seq    SEQUENCE     �   CREATE SEQUENCE public.empleados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.empleados_id_seq;
       public          postgres    false    210            �           0    0    empleados_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.empleados_id_seq OWNED BY public.empleados.id;
          public          postgres    false    209            \           2604    25330    empleados id    DEFAULT     l   ALTER TABLE ONLY public.empleados ALTER COLUMN id SET DEFAULT nextval('public.empleados_id_seq'::regclass);
 ;   ALTER TABLE public.empleados ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �          0    25327 	   empleados 
   TABLE DATA           v   COPY public.empleados (id, nombre, apellido, edad, pais, cargo, experiencia, residencia, email, telefono) FROM stdin;
    public          postgres    false    210   �       �           0    0    empleados_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.empleados_id_seq', 13, true);
          public          postgres    false    209            ^           2606    25332    empleados empleados_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.empleados DROP CONSTRAINT empleados_pkey;
       public            postgres    false    210            �   _  x�m��N�@��w��' �	�;�������11S隅mhl��g�ńr(�~�>��	INCqD�?1�������!��W�E��@�����M�堍�؜���"k�f�+!���5�u����Zc�R4_A��e���m0�^�^o|b~�	���U�.Ǧa��q���$�w�H&yDB(� {W��`�$�r�Vz0����ؘl����K,�uebS��hӽ{����1N���w���r�Y�)�j]����j��`�5ĘB����R�sb��<�Q\ջ��:�H�_�B�V7��c�h�&��Q����X��S6�Pc�j�&��Y����� |�)��_f��     