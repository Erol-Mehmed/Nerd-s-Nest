import { retrieveSequalize } from "../../../utils/preload_utils.js";
const sequalize = retrieveSequalize()
  const User = sequalize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.CHAR
    },
    image: {
      type: DataTypes.CHAR
    },
    date: {
      type: DataTypes.DATE
    }
  });

  // User.sync();
