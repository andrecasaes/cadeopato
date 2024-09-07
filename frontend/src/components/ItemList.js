import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Skeleton,
} from "@mui/material";
import ImageLoader from "./ImageLoader";
import "./ItemList.css";
import { format } from "date-fns"; // Import date-fns for formatting

const ItemList = ({
  loading,
  items,
  type,
  onEdit,
  apiBaseUrl,
  placeholderImage = "https://via.placeholder.com/40",
}) => {
  return (
    <List sx={{ mt: 4 }}>
      {loading
        ? Array.from(new Array(5)).map((_, index) => (
            <ListItem key={index} className={`admin-list-item`}>
              <ListItemText
                primary={<Skeleton variant="text" width="40%" height={30} />}
                secondary={
                  <>
                    <Skeleton variant="text" width="60%" height={20} />
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemSecondaryAction>
            </ListItem>
          ))
        : items.map((item) => (
            <ListItem
              key={item._id}
              className={`admin-list-item`}
              sx={{ cursor: "pointer" }}
              onClick={() => onEdit(item)}
            >
              <ListItemText
                primary={
                  <Typography variant="h5">
                    {type === "duck"
                      ? `Pato ${item.id}`
                      : item.username || item.name}
                  </Typography>
                }
                secondary={
                  type === "duck" ? (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Casa: {item.house?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Participante: {item.user?.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tipo: {item.type}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={item.found ? "success.main" : "error.main"}
                      >
                        {item.found && item.foundDate
                          ? `Encontrado em ${format(
                              new Date(item.foundDate),
                              "dd/MM/yyyy HH:mm"
                            )}`
                          : item.found
                          ? "Encontrado, data indisponível"
                          : "Escondido"}
                      </Typography>
                    </>
                  ) : null
                }
              />
              {type === "duck" || type === "user" ? (
                <ListItemSecondaryAction>
                  <ImageLoader
                    src={
                      type === "duck"
                        ? item.photo
                          ? `${apiBaseUrl}/${item.photo.replace(/\\/g, "/")}`
                          : placeholderImage
                        : type === "user"
                        ? item.profilePicture
                          ? `${apiBaseUrl}/${item.profilePicture.replace(
                              /\\/g,
                              "/"
                            )}`
                          : placeholderImage
                        : null
                    }
                    alt={
                      type === "duck"
                        ? `Duck ${item.id}`
                        : item.username || item.name
                    }
                    variant="circular"
                    className={`${type}-image`}
                    width={40}
                    height={40}
                  />
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
          ))}
    </List>
  );
};

export default ItemList;
