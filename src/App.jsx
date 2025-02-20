import { useEffect, useState } from "react";
import api from "./api";
// icons import
import { RiSearchLine } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAddSharp } from "react-icons/io5";
// components import
import Card from "./components/Card";
import Modal from "./components/Modal";

function App() {
  // state kurulumu
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // sayfa yüklendiğinde...
  useEffect(() => {
    api.get("/contact").then((res) => setContacts(res.data));
  }, []);

  // formu izle ve gönderildiğinde
  const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.target[1].value;

    const params = {
      q: query,
    };

    api.get("/contact", { params }).then((res) => setContacts(res.data));
  };

  // sil ikonuna tıklanınca...
  const handleDelete = (id) => {
    const res = confirm("Kişiyi silmek üzeresiniz ?");

    if (res) {
      api.delete(`/contact/${id}`).then(() => {
        const updatedContacts = contacts.filter((contact) => contact.id != id);

        setContacts(updatedContacts);
      });
    }
  };

  // güncelle ikonuna tıklayınca...
  const handleEdit = (contact) => {
    setIsModelOpen(true);

    setEditItem(contact);
  };

  return (
    <div className="app">
      {/*  header */}
      <header>
        {/* logo */}
        <h1>Rehber</h1>

        <div>
          {/* form */}
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearchLine />
            </button>
            <input type="search" placeholder="Kişi aratınız ..." />
          </form>
          <button className="ns">
            <IoIosMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>
          <button onClick={() => setIsModelOpen(true)} className="add">
            <IoPersonAddSharp />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>

      {/* main */}
      <main>
        {contacts.map((contact) => (
          <Card
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={contact.id}
          />
        ))}
      </main>

      {/* modal */}
      <Modal
        editItem={editItem}
        setEditItem={setEditItem}
        setContacts={setContacts}
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
      />
    </div>
  );
}

export default App;
