PGDMP     ,                    y           FAP    13.2    13.1 4    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16980    FAP    DATABASE     Z   CREATE DATABASE "FAP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE "FAP";
                marcusslee95    false            ?            1259    16999    one_off_behaviors    TABLE     ?   CREATE TABLE public.one_off_behaviors (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    marker boolean NOT NULL
);
 %   DROP TABLE public.one_off_behaviors;
       public         heap    marcusslee95    false            ?            1259    16997    one_off_behaviors_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.one_off_behaviors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.one_off_behaviors_id_seq;
       public          marcusslee95    false    205            ?           0    0    one_off_behaviors_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.one_off_behaviors_id_seq OWNED BY public.one_off_behaviors.id;
          public          marcusslee95    false    204            ?            1259    17026     one_off_behaviors_users_partners    TABLE     ?   CREATE TABLE public.one_off_behaviors_users_partners (
    id integer NOT NULL,
    one_off_behavior_id integer,
    user_id integer,
    partner_id integer
);
 4   DROP TABLE public.one_off_behaviors_users_partners;
       public         heap    marcusslee95    false            ?            1259    17024 '   one_off_behaviors_users_partners_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.one_off_behaviors_users_partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.one_off_behaviors_users_partners_id_seq;
       public          marcusslee95    false    211            ?           0    0 '   one_off_behaviors_users_partners_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.one_off_behaviors_users_partners_id_seq OWNED BY public.one_off_behaviors_users_partners.id;
          public          marcusslee95    false    210            ?            1259    16991    partners    TABLE     ?   CREATE TABLE public.partners (
    id integer NOT NULL,
    relationship character varying(50) NOT NULL,
    email character varying(60) NOT NULL,
    report_frequency character varying(20) NOT NULL,
    status character varying(20) NOT NULL
);
    DROP TABLE public.partners;
       public         heap    marcusslee95    false            ?            1259    16989    partners_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.partners_id_seq;
       public          marcusslee95    false    203            ?           0    0    partners_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.partners_id_seq OWNED BY public.partners.id;
          public          marcusslee95    false    202            ?            1259    17007    repeated_behaviors    TABLE     ?   CREATE TABLE public.repeated_behaviors (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    marker boolean[] NOT NULL,
    frequency character varying(20) NOT NULL,
    amount integer NOT NULL
);
 &   DROP TABLE public.repeated_behaviors;
       public         heap    marcusslee95    false            ?            1259    17005    repeated_behaviors_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.repeated_behaviors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.repeated_behaviors_id_seq;
       public          marcusslee95    false    207            ?           0    0    repeated_behaviors_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.repeated_behaviors_id_seq OWNED BY public.repeated_behaviors.id;
          public          marcusslee95    false    206            ?            1259    17018 !   repeated_behaviors_users_partners    TABLE     ?   CREATE TABLE public.repeated_behaviors_users_partners (
    id integer NOT NULL,
    repeated_behavior_id integer,
    user_id integer,
    partner_id integer
);
 5   DROP TABLE public.repeated_behaviors_users_partners;
       public         heap    marcusslee95    false            ?            1259    17016 (   repeated_behaviors_users_partners_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.repeated_behaviors_users_partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.repeated_behaviors_users_partners_id_seq;
       public          marcusslee95    false    209            ?           0    0 (   repeated_behaviors_users_partners_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.repeated_behaviors_users_partners_id_seq OWNED BY public.repeated_behaviors_users_partners.id;
          public          marcusslee95    false    208            ?            1259    16983    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(70) NOT NULL,
    email character varying(60) NOT NULL
);
    DROP TABLE public.users;
       public         heap    marcusslee95    false            ?            1259    16981    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          marcusslee95    false    201            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          marcusslee95    false    200            N           2604    17002    one_off_behaviors id    DEFAULT     |   ALTER TABLE ONLY public.one_off_behaviors ALTER COLUMN id SET DEFAULT nextval('public.one_off_behaviors_id_seq'::regclass);
 C   ALTER TABLE public.one_off_behaviors ALTER COLUMN id DROP DEFAULT;
       public          marcusslee95    false    205    204    205            Q           2604    17029 #   one_off_behaviors_users_partners id    DEFAULT     ?   ALTER TABLE ONLY public.one_off_behaviors_users_partners ALTER COLUMN id SET DEFAULT nextval('public.one_off_behaviors_users_partners_id_seq'::regclass);
 R   ALTER TABLE public.one_off_behaviors_users_partners ALTER COLUMN id DROP DEFAULT;
       public          marcusslee95    false    211    210    211            M           2604    16994    partners id    DEFAULT     j   ALTER TABLE ONLY public.partners ALTER COLUMN id SET DEFAULT nextval('public.partners_id_seq'::regclass);
 :   ALTER TABLE public.partners ALTER COLUMN id DROP DEFAULT;
       public          marcusslee95    false    202    203    203            O           2604    17010    repeated_behaviors id    DEFAULT     ~   ALTER TABLE ONLY public.repeated_behaviors ALTER COLUMN id SET DEFAULT nextval('public.repeated_behaviors_id_seq'::regclass);
 D   ALTER TABLE public.repeated_behaviors ALTER COLUMN id DROP DEFAULT;
       public          marcusslee95    false    206    207    207            P           2604    17021 $   repeated_behaviors_users_partners id    DEFAULT     ?   ALTER TABLE ONLY public.repeated_behaviors_users_partners ALTER COLUMN id SET DEFAULT nextval('public.repeated_behaviors_users_partners_id_seq'::regclass);
 S   ALTER TABLE public.repeated_behaviors_users_partners ALTER COLUMN id DROP DEFAULT;
       public          marcusslee95    false    209    208    209            L           2604    16986    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          marcusslee95    false    200    201    201            ?          0    16999    one_off_behaviors 
   TABLE DATA           =   COPY public.one_off_behaviors (id, name, marker) FROM stdin;
    public          marcusslee95    false    205   ?C       ?          0    17026     one_off_behaviors_users_partners 
   TABLE DATA           h   COPY public.one_off_behaviors_users_partners (id, one_off_behavior_id, user_id, partner_id) FROM stdin;
    public          marcusslee95    false    211    D       ?          0    16991    partners 
   TABLE DATA           U   COPY public.partners (id, relationship, email, report_frequency, status) FROM stdin;
    public          marcusslee95    false    203   ,D       ?          0    17007    repeated_behaviors 
   TABLE DATA           Q   COPY public.repeated_behaviors (id, name, marker, frequency, amount) FROM stdin;
    public          marcusslee95    false    207   ?D       ?          0    17018 !   repeated_behaviors_users_partners 
   TABLE DATA           j   COPY public.repeated_behaviors_users_partners (id, repeated_behavior_id, user_id, partner_id) FROM stdin;
    public          marcusslee95    false    209   E       ?          0    16983    users 
   TABLE DATA           >   COPY public.users (id, username, password, email) FROM stdin;
    public          marcusslee95    false    201   ;E       ?           0    0    one_off_behaviors_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.one_off_behaviors_id_seq', 2, true);
          public          marcusslee95    false    204            ?           0    0 '   one_off_behaviors_users_partners_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.one_off_behaviors_users_partners_id_seq', 3, true);
          public          marcusslee95    false    210                        0    0    partners_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.partners_id_seq', 3, true);
          public          marcusslee95    false    202                       0    0    repeated_behaviors_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.repeated_behaviors_id_seq', 2, true);
          public          marcusslee95    false    206                       0    0 (   repeated_behaviors_users_partners_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.repeated_behaviors_users_partners_id_seq', 2, true);
          public          marcusslee95    false    208                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          marcusslee95    false    200            W           2606    17004 (   one_off_behaviors one_off_behaviors_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.one_off_behaviors
    ADD CONSTRAINT one_off_behaviors_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.one_off_behaviors DROP CONSTRAINT one_off_behaviors_pkey;
       public            marcusslee95    false    205            ]           2606    17031 F   one_off_behaviors_users_partners one_off_behaviors_users_partners_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.one_off_behaviors_users_partners
    ADD CONSTRAINT one_off_behaviors_users_partners_pkey PRIMARY KEY (id);
 p   ALTER TABLE ONLY public.one_off_behaviors_users_partners DROP CONSTRAINT one_off_behaviors_users_partners_pkey;
       public            marcusslee95    false    211            U           2606    16996    partners partners_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.partners DROP CONSTRAINT partners_pkey;
       public            marcusslee95    false    203            Y           2606    17015 *   repeated_behaviors repeated_behaviors_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.repeated_behaviors
    ADD CONSTRAINT repeated_behaviors_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.repeated_behaviors DROP CONSTRAINT repeated_behaviors_pkey;
       public            marcusslee95    false    207            [           2606    17023 H   repeated_behaviors_users_partners repeated_behaviors_users_partners_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.repeated_behaviors_users_partners
    ADD CONSTRAINT repeated_behaviors_users_partners_pkey PRIMARY KEY (id);
 r   ALTER TABLE ONLY public.repeated_behaviors_users_partners DROP CONSTRAINT repeated_behaviors_users_partners_pkey;
       public            marcusslee95    false    209            S           2606    16988    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            marcusslee95    false    201            a           2606    17047 Z   one_off_behaviors_users_partners one_off_behaviors_users_partners_one_off_behavior_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.one_off_behaviors_users_partners
    ADD CONSTRAINT one_off_behaviors_users_partners_one_off_behavior_id_fkey FOREIGN KEY (one_off_behavior_id) REFERENCES public.one_off_behaviors(id);
 ?   ALTER TABLE ONLY public.one_off_behaviors_users_partners DROP CONSTRAINT one_off_behaviors_users_partners_one_off_behavior_id_fkey;
       public          marcusslee95    false    3159    205    211            c           2606    17057 Q   one_off_behaviors_users_partners one_off_behaviors_users_partners_partner_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.one_off_behaviors_users_partners
    ADD CONSTRAINT one_off_behaviors_users_partners_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(id);
 {   ALTER TABLE ONLY public.one_off_behaviors_users_partners DROP CONSTRAINT one_off_behaviors_users_partners_partner_id_fkey;
       public          marcusslee95    false    211    3157    203            b           2606    17052 N   one_off_behaviors_users_partners one_off_behaviors_users_partners_user_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.one_off_behaviors_users_partners
    ADD CONSTRAINT one_off_behaviors_users_partners_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 x   ALTER TABLE ONLY public.one_off_behaviors_users_partners DROP CONSTRAINT one_off_behaviors_users_partners_user_id_fkey;
       public          marcusslee95    false    211    201    3155            `           2606    17042 S   repeated_behaviors_users_partners repeated_behaviors_users_partners_partner_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.repeated_behaviors_users_partners
    ADD CONSTRAINT repeated_behaviors_users_partners_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(id);
 }   ALTER TABLE ONLY public.repeated_behaviors_users_partners DROP CONSTRAINT repeated_behaviors_users_partners_partner_id_fkey;
       public          marcusslee95    false    203    209    3157            ^           2606    17032 ]   repeated_behaviors_users_partners repeated_behaviors_users_partners_repeated_behavior_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.repeated_behaviors_users_partners
    ADD CONSTRAINT repeated_behaviors_users_partners_repeated_behavior_id_fkey FOREIGN KEY (repeated_behavior_id) REFERENCES public.repeated_behaviors(id);
 ?   ALTER TABLE ONLY public.repeated_behaviors_users_partners DROP CONSTRAINT repeated_behaviors_users_partners_repeated_behavior_id_fkey;
       public          marcusslee95    false    207    209    3161            _           2606    17037 P   repeated_behaviors_users_partners repeated_behaviors_users_partners_user_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.repeated_behaviors_users_partners
    ADD CONSTRAINT repeated_behaviors_users_partners_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 z   ALTER TABLE ONLY public.repeated_behaviors_users_partners DROP CONSTRAINT repeated_behaviors_users_partners_user_id_fkey;
       public          marcusslee95    false    3155    201    209            ?   D   x?3??/H?SHT??L?Ѝ?L?IQN,??K/VpLN?/?+?L?2?t?W??/-RI?H-???qqq Z?v      ?      x?3?4B#.#0m?e?i?c???? 4m      ?   p   x?u?1?0@??9EN?T? R?Puc1?!?g????`?x/???_?L!Yׂ?????"?5?y?6??z???JP??????h? ??U???,*????9?N?=      ?   X   x?3?,N?KQ???K?T(?WH/J?K?M??.?I?)?)??J?d?Trp??.H,J?+)??O??L?L??+M?j0j????? ? 7      ?      x?3?4A.#N#0???? }      ?   W   x?3??????wK,?LK,??/-*O?,?O??K?K?L?I+JMM??uH?M???K???2??q??t?w?,IL?)M-NI?DR???? ev?     