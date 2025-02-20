// icons import
import { IoMdClose } from "react-icons/io";

import api from "../api";
// components import
import Field from "./Field";
const Modal = ({
  isModelOpen,
  setIsModelOpen,
  setContacts,
  editItem,
  setEditItem,
}) => {
  // formu izle ve gönderildiğinde...
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData.entries());

    if (!editItem) {
      // erişilen değerleri api'a gönder
      const response = await api.post("/contact", newContact);

      setContacts((contacts) => [...contacts, response.data]);
    } else {
      // güncellenecek kişiyi api'a gönder
      const response = await api.put(`/contact/${editItem.id}`, newContact);

      setContacts((contacts) =>
        contacts.map((contact) =>
          contact.id === editItem.id ? response.data : contact
        )
      );

      setEditItem(null);
    }

    setIsModelOpen(false);
  };

  return (
    isModelOpen && (
      <div className="modal">
        <div className="modal-inner">
          {/* head */}
          <div className="modal-head">
            {/* güncelleme veya yeni kişi eklemeye göre değiştir */}
            <h2>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"} </h2>
            <button
              onClick={() => {
                setEditItem(null);
                setIsModelOpen(false);
              }}
            >
              <IoMdClose />
            </button>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim Soyisim" name="name" />
            <Field
              value={editItem?.position}
              label="Pozisyon"
              name="position"
            />
            <Field label="Şirket" value={editItem?.company} name="company" />
            <Field label="Telefon" value={editItem?.phone} name="phone" />
            <Field label="Email" value={editItem?.email} name="email" />
            <div className="buttons">
              <button
                onClick={() => {
                  setEditItem(null);
                  setIsModelOpen(false);
                }}
              >
                Vazgeç
              </button>
              <button type="submit">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
