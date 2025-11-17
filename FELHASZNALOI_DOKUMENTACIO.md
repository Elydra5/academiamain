# Academia Main() - Felhasználói Dokumentáció

## Tartalomjegyzék

1. [Bevezetés](#bevezetés)
2. [Bejelentkezés és Regisztráció](#bejelentkezés-és-regisztráció)
3. [Főoldal és Navigáció](#főoldal-és-navigáció)
4. [Tanulók Kezelése](#tanulók-kezelése)
5. [Csoportok Kezelése](#csoportok-kezelése)
6. [Felhasználók Kezelése](#felhasználók-kezelése)
7. [Jelenlét Nyilvántartás](#jelenlét-nyilvántartás)
8. [Számlázás](#számlázás)
9. [Jelszó Visszaállítás](#jelszó-visszaállítás)

---

## Bevezetés

Az Academia Main() egy erasmus alatt készült webes alkalmazás, amely segítségével kezelhetők a tanulók, csoportok, felhasználók, jelenléti adatok és számlázási információk.

### Főbb funkciók:
- Tanulók kezelése (létrehozás, szerkesztés, törlés, részletek megtekintése)
- Csoportok kezelése (létrehozás, szerkesztés, törlés, tanulók hozzárendelése)
- Felhasználók kezelése (adminisztrátorok, tanárok, tanulók)
- Jelenléti adatok rögzítése és nyilvántartása
- Számlák és bizonylatok generálása
- Felhasználói fiókok kezelése

---

## Bejelentkezés és Regisztráció

### Bejelentkezési Oldal

**Elérés:** Az alkalmazás megnyitásakor automatikusan megjelenik.

**Funkció:** Bejelentkezés meglévő fiókkal vagy új fiók létrehozása.

#### Kattintható elemek és funkciók:

1. **"Login" fül**
   - A bejelentkezési űrlap megjelenítése
   - Alapértelmezett fül

2. **"Register" fül**
   - A regisztrációs űrlap megjelenítése
   - Kattintásra vált a két nézet között

3. **Bejelentkezési űrlap mezői:**
   - **Felhasználónév mező** (Username)
     - Kötelező mező
     - A regisztrációkor megadott felhasználónevet kell megadni
   - **Jelszó mező** (Password)
     - Kötelező mező
     - A fiókhoz tartozó jelszót kell megadni
   - **"Forgot password?" link**
     - A jelszó visszaállítási oldalra irányít
     - Kattintásra megnyílik a jelszó visszaállítási oldal

4. **"Sign In" gomb**
   - A bejelentkezési adatok elküldése
   - Betöltés közben "Loading..." szöveg jelenik meg
   - Sikeres bejelentkezés után a Tanulók oldalra irányít
   - Hiba esetén hibaüzenet jelenik meg az űrlap alatt

5. **Regisztrációs űrlap mezői:**
   - **Email mező** (Email)
     - Kötelező mező
     - Érvényes email formátumot vár (pl. user@example.com)
   - **Felhasználónév mező** (Username)
     - Kötelező mező
     - Egyedi felhasználónevet kell megadni
   - **Jelszó mező** (Password)
     - Kötelező mező
     - A fiókhoz tartozó jelszót kell megadni
   - **Jelszó megerősítés mező** (Confirm Password)
     - Kötelező mező
     - A jelszó mezővel egyező értéket kell megadni
     - Ha nem egyezik, hibaüzenet jelenik meg

6. **"Sign Up" gomb**
   - A regisztrációs adatok elküldése
   - Betöltés közben "Loading..." szöveg jelenik meg
   - Sikeres regisztráció után automatikusan átvált a bejelentkezési nézetre
   - A felhasználónév automatikusan bekerül a bejelentkezési mezőbe
   - Hiba esetén hibaüzenet jelenik meg

**Várható működés:**
- Sikeres bejelentkezés után a rendszer átirányít a Tanulók oldalra
- Sikertelen bejelentkezés esetén hibaüzenet jelenik meg
- A regisztráció után lehetőség van azonnal bejelentkezni

---

## Főoldal és Navigáció

### Navigációs Sáv (Navbar)

**Elhelyezkedés:** Az oldal tetején, minden bejelentkezett felhasználó számára látható.

**Funkció:** Gyors navigáció az alkalmazás különböző részei között.

#### Kattintható elemek:

1. **"Academia Main()" logó**
   - A Tanulók oldalra irányít
   - Kattintásra a főoldalra navigál

2. **"Students" (Tanulók) menüpont**
   - A Tanulók listázó oldalra irányít
   - Aktív oldal esetén kiemelt megjelenés

3. **"Groups" (Csoportok) menüpont**
   - A Csoportok listázó oldalra irányít
   - Aktív oldal esetén kiemelt megjelenés

4. **"Users" (Felhasználók) menüpont**
   - A Felhasználók listázó oldalra irányít
   - Aktív oldal esetén kiemelt megjelenés

5. **"Attendance" (Jelenlét) menüpont**
   - A Jelenlét nyilvántartás oldalra irányít
   - Aktív oldal esetén kiemelt megjelenés

6. **"Billing" (Számlázás) menüpont**
   - A Számlázás oldalra irányít
   - Aktív oldal esetén kiemelt megjelenés

7. **Nyelvválasztó gombok:**
   - **"ES" gomb** - Spanyol nyelvre vált
   - **"EN" gomb** - Angol nyelvre vált
   - Az aktív nyelv kiemelt megjelenésű

8. **"Logout" (Kijelentkezés) gomb**
   - Kijelentkezteti a felhasználót
   - A bejelentkezési oldalra irányít
   - Törli a munkamenet adatait

### Footer

**Elhelyezkedés:** Az oldal alján, minden bejelentkezett felhasználó számára látható.

**Tartalom:**
- Gyors linkek a főbb oldalakhoz (Tanulók, Csoportok, Jelenlét, Számlázás)
- Támogatási linkek (Jelszó visszaállítás)
- Copyright információ

---

## Tanulók Kezelése

### Tanulók Listázó Oldal

**Elérés:** Navigációs menüben a "Students" menüpontra kattintva.

**Funkció:** Összes tanuló listázása, új tanuló hozzáadása, tanuló részleteinek megtekintése.

#### Kattintható elemek és funkciók:

1. **"Add Student" (Tanuló hozzáadása) gomb**
   - Jobb felső sarokban található
   - Kattintásra megnyílik egy modal ablak
   - Új tanuló hozzáadására szolgál

2. **Oldalméret választó (Show)**
   - Legördülő menü
   - Lehetőségek: 10, 20, 30, 50 tanuló oldalanként
   - Változtatásra az oldal újratöltődik a kiválasztott mérettel

3. **Tanuló kártyák**
   - Minden tanuló egy kártyán jelenik meg
   - **Kattintható:** A kártyára kattintva a tanuló részletes oldalára navigál
   - **Tartalom:**
     - Tanuló avatárja (név kezdőbetűi)
     - Teljes név (keresztnév + vezetéknév)
     - Telefonszám ikonnal
   - **Nyíl ikon:** Jobb oldalon, jelzi, hogy kattintható

4. **Lapozás**
   - Ha több tanuló van, mint az oldalméret, lapozó jelenik meg
   - **Előző oldal gomb:** Visszalép az előző oldalra (első oldalon letiltva)
   - **Oldalszám gombok:** Közvetlenül egy adott oldalra ugrik
   - **Következő oldal gomb:** Továbblép a következő oldalra (utolsó oldalon letiltva)
   - **Oldal információ:** Megjeleníti, hogy hány tanuló van összesen és melyik tartományban jelenik meg

5. **Üres állapot**
   - Ha nincsenek tanulók, egy üzenet jelenik meg
   - "No students" szöveg és ikon
   - "Get started" üzenet

#### Új Tanuló Hozzáadása Modal

**Megnyitás:** "Add Student" gombra kattintva.

**Mezők:**
- **First Name (Keresztnév)** - Kötelező mező, szöveg
- **Last Name (Vezetéknév)** - Kötelező mező, szöveg
- **Phone Number (Telefonszám)** - Opcionális mező, szöveg

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti az adatokat
  - A modal háttérre kattintva is bezárható

- **"Create Student" (Tanuló létrehozása) gomb:**
  - Létrehozza az új tanulót
  - Hozzáadja a listához
  - Bezárja a modal ablakot
  - Hiba esetén hibaüzenet jelenik meg

### Tanuló Részletes Oldal

**Elérés:** Tanuló kártyára kattintva a listázó oldalról.

**Funkció:** Egy tanuló részletes adatainak megtekintése, szerkesztése, törlése, csoporthoz rendelése.

#### Kattintható elemek és funkciók:

1. **"Back" (Vissza) gomb**
   - Bal felső sarokban
   - A Tanulók listázó oldalra navigál

2. **"Edit" (Szerkesztés) gomb**
   - Jobb felső sarokban
   - Kattintásra megnyílik a szerkesztési modal
   - A tanuló adatainak módosítására szolgál

3. **"Delete" (Törlés) gomb**
   - Jobb felső sarokban, a Szerkesztés gomb mellett
   - Kattintásra megerősítő párbeszédablak jelenik meg
   - Megerősítés után törli a tanulót
   - Törlés után visszairányít a Tanulók listázó oldalra

4. **Tanuló adatok megjelenítése:**
   - **Név:** Nagy betűkkel, kiemelt
   - **Beiratkozás dátuma:** Badge formában
   - **Telefonszám:** Ikonnal és címkével
   - **Beiratkozás dátuma részletekben:** Teljes dátum formátumban

5. **Csoporthoz rendelés szekció:**
   - **Csoport választó legördülő menü:**
     - Listázza az összes elérhető csoportot
     - "Select group" alapértelmezett opció
     - Ha nincsenek csoportok, letiltva
   - **"Enroll" (Beiratkozás) gomb:**
     - A kiválasztott csoporthoz rendeli a tanulót
     - Betöltés közben "Enrolling..." szöveg jelenik meg
     - Sikeres művelet után sikerüzenet jelenik meg
     - Hiba esetén hibaüzenet jelenik meg
   - **Visszajelzés üzenetek:**
     - Sikerüzenet zöld színnel
     - Hibaüzenet piros színnel

#### Tanuló Szerkesztése Modal

**Megnyitás:** "Edit" gombra kattintva.

**Mezők:**
- **First Name (Keresztnév)** - Szöveg mező, szerkeszthető
- **Last Name (Vezetéknév)** - Szöveg mező, szerkeszthető
- **Phone Number (Telefonszám)** - Szöveg mező, szerkeszthető
- **Enrollment Date (Beiratkozás dátuma)** - Dátum választó mező

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti a változtatásokat

- **"Save" (Mentés) gomb:**
  - Elmenti a módosításokat
  - Frissíti a tanuló adatait
  - Bezárja a modal ablakot
  - Hiba esetén hibaüzenet jelenik meg

---

## Csoportok Kezelése

### Csoportok Listázó Oldal

**Elérés:** Navigációs menüben a "Groups" menüpontra kattintva.

**Funkció:** Összes csoport listázása, új csoport létrehozása, csoport részleteinek megtekintése.

#### Kattintható elemek és funkciók:

1. **"Add Group" (Csoport hozzáadása) gomb**
   - Jobb felső sarokban található
   - Kattintásra megnyílik egy modal ablak
   - Új csoport létrehozására szolgál

2. **Csoport kártyák**
   - Minden csoport egy kártyán jelenik meg
   - **Kattintható:** A kártyára kattintva a csoport részletes oldalára navigál
   - **Tartalom:**
     - Csoport ikon
     - Csoport neve
     - Hosszú leírás (ha van)
     - Tanulók száma badge formában
   - **Nyíl ikon:** Jobb oldalon, jelzi, hogy kattintható

3. **Üres állapot**
   - Ha nincsenek csoportok, egy üzenet jelenik meg
   - "No groups" szöveg és ikon
   - "Get started" üzenet

#### Új Csoport Létrehozása Modal

**Megnyitás:** "Add Group" gombra kattintva.

**Mezők:**
- **Name (Név)** - Kötelező mező, szöveg
- **Short Description (Rövid leírás)** - Opcionális mező, szöveg
- **Moodle ID** - Opcionális mező, szám
- **End Date (Befejezés dátuma)** - Opcionális mező, dátum választó
- **Teacher (Tanár)** - Opcionális mező, legördülő menü (felhasználók listájából)
- **Long Description (Hosszú leírás)** - Opcionális mező, több soros szöveg

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti az adatokat

- **"Create Group" (Csoport létrehozása) gomb:**
  - Létrehozza az új csoportot
  - Hozzáadja a listához
  - Bezárja a modal ablakot
  - Hiba esetén hibaüzenet jelenik meg

### Csoport Részletes Oldal

**Elérés:** Csoport kártyára kattintva a listázó oldalról.

**Funkció:** Egy csoport részletes adatainak megtekintése, szerkesztése, törlése, csoporthoz tartozó tanulók listázása.

#### Kattintható elemek és funkciók:

1. **"Back" (Vissza) gomb**
   - Bal felső sarokban
   - A Csoportok listázó oldalra navigál

2. **"Edit" (Szerkesztés) gomb**
   - Jobb felső sarokban
   - Kattintásra megnyílik a szerkesztési modal
   - A csoport adatainak módosítására szolgál

3. **"Delete" (Törlés) gomb**
   - Jobb felső sarokban, a Szerkesztés gomb mellett
   - Kattintásra megerősítő párbeszédablak jelenik meg
   - Megerősítés után törli a csoportot
   - Törlés után visszairányít a Csoportok listázó oldalra

4. **Csoport adatok megjelenítése:**
   - **Név:** Nagy betűkkel, kiemelt
   - **Státusz badge:** Aktív/Inaktív státusz
   - **Tanár badge:** Ha van hozzárendelt tanár
   - **Rövid leírás:** Ha van megadva
   - **Hosszú leírás:** Ha van megadva
   - **Tanár neve:** Ha van hozzárendelve
   - **Moodle ID:** Ha van megadva
   - **Kezdés dátuma:** Ha van megadva
   - **Befejezés dátuma:** Ha van megadva
   - **Státusz:** Aktív vagy Inaktív

5. **Tanulók szekció:**
   - **"Students in Group" (Csoportban lévő tanulók) cím:**
     - Listázza a csoporthoz tartozó tanulókat
   - **Tanuló kártyák:**
     - Minden tanuló egy kártyán jelenik meg
     - **Kattintható:** A kártyára kattintva a tanuló részletes oldalára navigál
     - **Tartalom:**
       - Tanuló ikon
       - Teljes név
       - Telefonszám (ha van)
       - Beiratkozás dátuma (ha van)
     - **Nyíl ikon:** Jobb oldalon
   - **Üres állapot:**
     - Ha nincsenek tanulók a csoportban, "No students" üzenet jelenik meg

#### Csoport Szerkesztése Modal

**Megnyitás:** "Edit" gombra kattintva.

**Mezők:**
- **Name (Név)** - Szöveg mező, szerkeszthető
- **Short Description (Rövid leírás)** - Szöveg mező, szerkeszthető
- **Long Description (Hosszú leírás)** - Több soros szöveg mező, szerkeszthető
- **Moodle ID** - Szám mező, szerkeszthető
- **Start Date (Kezdés dátuma)** - Dátum választó mező
- **End Date (Befejezés dátuma)** - Szöveg mező (dátum formátumban)
- **Status (Státusz)** - Legördülő menü (Active/Inactive)
- **Teacher (Tanár)** - Szöveg mező, szerkeszthető

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti a változtatásokat

- **"Save" (Mentés) gomb:**
  - Elmenti a módosításokat
  - Frissíti a csoport adatait
  - Bezárja a modal ablakot
  - Hiba esetén hibaüzenet jelenik meg

---

## Felhasználók Kezelése

### Felhasználók Listázó Oldal

**Elérés:** Navigációs menüben a "Users" menüpontra kattintva.

**Funkció:** Összes felhasználó listázása, új felhasználó létrehozása, felhasználó részleteinek megtekintése.

#### Kattintható elemek és funkciók:

1. **"Add User" (Felhasználó hozzáadása) gomb**
   - Jobb felső sarokban található
   - Kattintásra megnyílik egy modal ablak
   - Új felhasználó létrehozására szolgál

2. **Felhasználó kártyák**
   - Minden felhasználó egy kártyán jelenik meg
   - **Kattintható:** A kártyára kattintva a felhasználó részletes oldalára navigál
   - **Tartalom:**
     - Felhasználó ikon
     - Felhasználónév
     - Email cím (ha van, egyébként "No email")
     - Szerepkör badge (admin, teacher, student, vagy "User")
   - **Nyíl ikon:** Jobb oldalon, jelzi, hogy kattintható

3. **Üres állapot**
   - Ha nincsenek felhasználók, egy üzenet jelenik meg
   - "No users" szöveg és ikon
   - "Get started" üzenet

#### Új Felhasználó Létrehozása Modal

**Megnyitás:** "Add User" gombra kattintva.

**Mezők:**
- **Username (Felhasználónév)** - Kötelező mező, szöveg
- **Email** - Opcionális mező, email formátum
- **Password (Jelszó)** - Kötelező mező, jelszó típus
- **Role (Szerepkör)** - Opcionális mező, legördülő menü:
  - Admin
  - Teacher
  - Student

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti az adatokat

- **"Create User" (Felhasználó létrehozása) gomb:**
  - Létrehozza az új felhasználót
  - Hozzáadja a listához
  - Bezárja a modal ablakot
  - Hiba esetén hibaüzenet jelenik meg

### Felhasználó Részletes Oldal

**Elérés:** Felhasználó kártyára kattintva a listázó oldalról.

**Funkció:** Egy felhasználó részletes adatainak megtekintése, szerkesztése, törlése.

#### Kattintható elemek és funkciók:

1. **"Back" (Vissza) gomb**
   - Bal felső sarokban
   - A Felhasználók listázó oldalra navigál

2. **"Edit" (Szerkesztés) gomb**
   - Jobb felső sarokban
   - Kattintásra megnyílik a szerkesztési modal
   - A felhasználó adatainak módosítására szolgál

3. **"Delete" (Törlés) gomb**
   - Jobb felső sarokban, a Szerkesztés gomb mellett
   - Kattintásra megerősítő párbeszédablak jelenik meg
   - Megerősítés után törli a felhasználót
   - Törlés után visszairányít a Felhasználók listázó oldalra

4. **Felhasználó adatok megjelenítése:**
   - **Név:** Nagy betűkkel, kiemelt (ha van keresztnév/vezetéknév, egyébként felhasználónév)
   - **Szerepkör badge:** Megjeleníti a felhasználó szerepkörét
   - **Státusz badge:** Aktív/Inaktív státusz (színkódolt)
   - **Felhasználónév:** Részletes adatok között
   - **Email:** Részletes adatok között (ha van, egyébként "No email")
   - **Szerepkör:** Részletes adatok között
   - **Keresztnév:** Ha van megadva
   - **Vezetéknév:** Ha van megadva
   - **Moodle ID:** Ha van megadva
   - **Utolsó bejelentkezés:** Dátum és idő formátumban (vagy "Never" ha soha nem jelentkezett be)
   - **Státusz:** Aktív vagy Inaktív

#### Felhasználó Szerkesztése Modal

**Megnyitás:** "Edit" gombra kattintva.

**Mezők:**
- **Username (Felhasználónév)** - Szöveg mező, szerkeszthető
- **First Name (Keresztnév)** - Szöveg mező, szerkeszthető
- **Last Name (Vezetéknév)** - Szöveg mező, szerkeszthető
- **Email** - Email mező, szerkeszthető
- **Role (Szerepkör)** - Legördülő menü (Admin, Teacher, Student)
- **Moodle ID** - Szám mező, szerkeszthető
- **Status (Státusz)** - Legördülő menü (Active: 1, Inactive: 0)

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti a változtatásokat

- **"Save" (Mentés) gomb:**
  - Elmenti a módosításokat
  - Frissíti a felhasználó adatait
  - Bezárja a modal ablakot
  - Hiba esetén hibaüzenet jelenik meg

---

## Jelenlét Nyilvántartás

### Jelenlét Oldal

**Elérés:** Navigációs menüben a "Attendance" menüpontra kattintva.

**Funkció:** Jelenléti adatok listázása, új jelenléti adat rögzítése, szerkesztése, törlése, bizonylat generálása.

#### Kattintható elemek és funkciók:

1. **"Add Attendance" (Jelenlét hozzáadása) gomb**
   - Jobb felső sarokban található
   - Kattintásra megnyílik egy modal ablak
   - Új jelenléti adat rögzítésére szolgál

2. **Sikerüzenet**
   - Zöld színű alert doboz
   - Sikeres műveletek után jelenik meg (létrehozás, szerkesztés, törlés, bizonylat generálás)
   - 3 másodperc után automatikusan eltűnik

3. **Jelenléti táblázat**
   - Táblázat formában jeleníti meg az összes jelenléti adatot
   - **Oszlopok:**
     - **Student (Tanuló):** Tanuló teljes neve
     - **Group (Csoport):** Csoport neve
     - **Date (Dátum):** Jelenlét dátuma
     - **Duration (Időtartam):** Órákban és percekben formázva
     - **Teacher (Tanár):** Tanár felhasználóneve
     - **Hourly Rate (Óradíj):** Euróban megadva
     - **Receipt (Bizonylat):** Badge jelzi, hogy van-e generált bizonylat
     - **Actions (Műveletek):** Műveleti gombok

4. **Műveleti gombok (minden sorban):**
   - **Szerkesztés ikon gomb:**
     - Kattintásra megnyílik a szerkesztési modal
     - A jelenléti adat módosítására szolgál
   - **Törlés ikon gomb:**
     - Kattintásra megerősítő párbeszédablak jelenik meg
     - Megerősítés után törli a jelenléti adatot
   - **Bizonylat generálás ikon gomb:**
     - Csak akkor jelenik meg, ha még nincs generált bizonylat
     - Kattintásra megnyílik a bizonylat generálási modal

5. **Üres állapot**
   - Ha nincsenek jelenléti adatok, egy üzenet jelenik meg a táblázatban
   - "No attendance" szöveg és ikon
   - "Get started" üzenet

#### Új Jelenléti Adat Rögzítése Modal

**Megnyitás:** "Add Attendance" gombra kattintva.

**Mezők (minden kötelező):**
- **Student (Tanuló)** - Legördülő menü, tanulók listájából választható
- **Group (Csoport)** - Legördülő menü, csoportok listájából választható
- **Date (Dátum)** - Dátum választó mező
- **Duration (Időtartam)** - Szám mező, percekben (minimum 1 perc)
- **Teacher (Tanár)** - Legördülő menü, tanárok listájából választható
- **Hourly Rate (Óradíj)** - Szám mező, euróban, tizedesjegyekkel (minimum 0)

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti az adatokat

- **"Create Attendance" (Jelenlét létrehozása) gomb:**
  - Létrehozza az új jelenléti adatot
  - Hozzáadja a táblázathoz
  - Bezárja a modal ablakot
  - Sikerüzenet jelenik meg
  - Hiba esetén hibaüzenet jelenik meg a modalban

#### Jelenléti Adat Szerkesztése Modal

**Megnyitás:** Szerkesztés ikon gombra kattintva egy sorban.

**Mezők (minden kötelező):**
- **Student (Tanuló)** - Legördülő menü, tanulók listájából választható
- **Group (Csoport)** - Legördülő menü, csoportok listájából választható
- **Date (Dátum)** - Dátum választó mező
- **Duration (Időtartam)** - Szám mező, percekben (minimum 1 perc)
- **Teacher (Tanár)** - Legördülő menü, tanárok listájából választható
- **Hourly Rate (Óradíj)** - Szám mező, euróban, tizedesjegyekkel (minimum 0)

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem menti a változtatásokat

- **"Save" (Mentés) gomb:**
  - Elmenti a módosításokat
  - Frissíti a jelenléti adatot a táblázatban
  - Bezárja a modal ablakot
  - Sikerüzenet jelenik meg
  - Hiba esetén hibaüzenet jelenik meg a modalban

#### Bizonylat Generálása Modal

**Megnyitás:** Bizonylat generálás ikon gombra kattintva egy sorban (csak akkor látható, ha nincs még bizonylat).

**Funkció:** PDF bizonylat generálása a jelenléti adathoz.

**Információk megjelenítése:**
- Tanuló neve
- Dátum
- Időtartam

**Mezők (mind opcionális):**
- **Hours (Órák)** - Szám mező, tizedesjegyekkel
  - Ha nincs megadva, automatikusan számolódik (időtartam / 60)
- **Hourly Rate (Óradíj)** - Szám mező, euróban, tizedesjegyekkel
  - Ha nincs megadva, a jelenléti adat óradíját használja
- **Payment Method (Fizetési mód)** - Szöveg mező (pl. Cash, Card, stb.)

**Gombok:**
- **"Cancel" (Mégse) gomb:**
  - Bezárja a modal ablakot
  - Nem generál bizonylatot

- **"Generate Receipt" (Bizonylat generálása) gomb:**
  - Generálja a PDF bizonylatot
  - Betöltés közben "Generating..." szöveg jelenik meg
  - Sikeres generálás után automatikusan letölti a PDF fájlt
  - Frissíti a jelenléti adatot (bizonylat ID hozzáadása)
  - Bezárja a modal ablakot
  - Sikerüzenet jelenik meg
  - Hiba esetén hibaüzenet jelenik meg a modalban

---

## Számlázás

### Számlázás Oldal

**Elérés:** Navigációs menüben a "Billing" menüpontra kattintva.

**Funkció:** Számlák generálása tanulók számára.

#### Kattintható elemek és funkciók:

1. **Számla generálási űrlap**
   - Központi kártyában található
   - "Generate Invoice" (Számla generálása) címmel

2. **Hibaüzenet**
   - Piros színű alert doboz
   - Hibás adatok vagy hiba esetén jelenik meg
   - Az űrlap tetején

3. **Sikerüzenet**
   - Zöld színű alert doboz
   - Sikeres számla generálás után jelenik meg
   - Az űrlap tetején

4. **Űrlap mezők (minden kötelező):**
   - **Student (Tanuló)** - Legördülő menü, tanulók listájából választható
     - "Select a student" alapértelmezett opció
     - Betöltés közben letiltva
   - **Hours Studied (Tanult órák)** - Szám mező, tizedesjegyekkel
     - Minimum 0.01
     - Számla generálás közben letiltva
   - **Total Amount (Összeg)** - Szám mező, euróban, tizedesjegyekkel
     - Minimum 0.01
     - Számla generálás közben letiltva

5. **"Reset" (Visszaállítás) gomb**
   - Másodlagos gomb
   - Törli az összes mezőt
   - Visszaállítja az alapértelmezett értékekre
   - Számla generálás közben letiltva

6. **"Generate Invoice" (Számla generálása) gomb**
   - Elsődleges gomb
   - Elküldi az adatokat a szervernek
   - Betöltés közben "Generating..." szöveg jelenik meg
   - Betöltés közben letiltva
   - Sikeres generálás után:
     - Automatikusan letölti a PDF számlát
     - Sikerüzenet jelenik meg
     - 2 másodperc után automatikusan visszaállítja az űrlapot
   - Hiba esetén hibaüzenet jelenik meg

7. **Betöltési állapot**
   - "Loading students..." szöveg
   - Tanulók betöltése közben jelenik meg

**Várható működés:**
- A számla PDF formátumban töltődik le
- A fájlnév formátuma: `invoice_[tanuló_id]_[időbélyeg].pdf`
- A számla tartalmazza a tanuló adatait, tanult órákat és az összeget

---

## Jelszó Visszaállítás

### Jelszó Visszaállítási Oldal

**Elérés:** 
- Bejelentkezési oldalon a "Forgot password?" linkre kattintva
- Láblécben a "Forgot Password" linkre kattintva

**Funkció:** Jelszó visszaállítási link küldése email címre.

#### Kattintható elemek és funkciók:

1. **"Back to Login" (Vissza a bejelentkezéshez) link**
   - Bal felső sarokban
   - Vissza ikonnal
   - A bejelentkezési oldalra navigál

2. **Email mező**
   - Kötelező mező
   - Email formátumot vár
   - Placeholder: "Enter your email"

3. **"Send Reset Link" (Visszaállítási link küldése) gomb**
   - Elküldi a jelszó visszaállítási kérést
   - Betöltés közben "Sending..." szöveg jelenik meg
   - Betöltés közben letiltva
   - Sikeres küldés után:
     - Sikerüzenet jelenik meg: "Password reset link has been sent to your email."
     - Az email mező törlődik
   - Hiba esetén hibaüzenet jelenik meg

4. **Sikerüzenet**
   - Zöld színű üzenet
   - Sikeres email küldés után jelenik meg

5. **Hibaüzenet**
   - Piros színű üzenet
   - Hiba esetén jelenik meg

**Várható működés:**
- A rendszer emailt küld a megadott címre
- Az email tartalmazza a jelszó visszaállítási linket
- A linkre kattintva lehetőség van új jelszót beállítani

---

## Általános Funkciók és Megjegyzések

### Modal Ablakok

- **Bezárás módjai:**
  - "Cancel" vagy "Close" gombra kattintva
  - A modal háttérre (overlay) kattintva
  - ESC billentyű (böngésző függő)

### Hibaüzenetek

- Piros színnel jelennek meg
- Általában az űrlap tetején vagy a modalban
- Részletes információt adnak a hiba okáról

### Sikerüzenetek

- Zöld színnel jelennek meg
- Sikeres műveletek után jelennek meg
- Általában automatikusan eltűnnek néhány másodperc után

### Betöltési Állapotok

- "Loading..." vagy hasonló szövegek jelennek meg
- Gombok letiltva betöltés közben
- Spinner vagy hasonló animációk jelenhetnek meg

### Validáció

- Kötelező mezők jelölése (*)
- Email formátum ellenőrzés
- Szám mezők validálása
- Dátum mezők validálása
- Jelszó egyezés ellenőrzés (regisztrációnál)

### Navigáció

- Breadcrumb navigáció nincs, de "Back" gombok segítik a navigációt
- Aktív oldal kiemelése a navigációs menüben
- Automatikus átirányítás műveletek után

### Responsive Design

- Az alkalmazás reszponzív, működik különböző képernyőméreteken
- Mobil és tablet eszközökön is használható

---

## Hibaelhárítás

### Gyakori problémák és megoldások:

1. **Nem tudok bejelentkezni:**
   - Ellenőrizze a felhasználónevet és jelszót
   - Próbálja meg a jelszó visszaállítási funkciót

2. **Nem jelennek meg az adatok:**
   - Frissítse az oldalt (F5)
   - Ellenőrizze az internetkapcsolatot
   - Várjon néhány másodpercet a betöltésre

3. **Hibaüzenet jelenik meg:**
   - Olvassa el a hibaüzenet részleteit
   - Próbálja meg újra a műveletet
   - Ha a probléma továbbra is fennáll, lépjen kapcsolatba az adminisztrátorral

4. **PDF nem töltődik le:**
   - Ellenőrizze a böngésző letöltési beállításait
   - Próbálja meg másik böngészőben
   - Ellenőrizze, hogy nincs-e blokkolva a letöltés

---

## További Információk

Ez a dokumentáció az Academia Main() alkalmazás aktuális verziójára vonatkozik. Az alkalmazás folyamatos fejlesztés alatt áll, ezért egyes funkciók változhatnak.

---

**Dokumentáció verzió:** 1.0  
**Utolsó frissítés:** 2025

