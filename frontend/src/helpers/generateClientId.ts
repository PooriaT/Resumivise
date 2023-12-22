import { v4 as uuidv4 } from "uuid";

const generateClientId = () => {
    const generatedId = uuidv4(); //UUID
    return generatedId;
  };

export default generateClientId;  