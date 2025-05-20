import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        pathname: "/user/search",
        search: createSearchParams({
          q: searchQuery.trim()
        }).toString()
      });
      setSearchQuery(""); // Reset search input after search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        width: "680px",
        backgroundColor: "#fff",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "3px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "30px auto",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Bạn muốn tìm sản phẩm gì?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          backgroundColor: "transparent",
          color: "#000",
          width: "80%",
          "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "10px 20px",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "transparent" },
          },
          "&:hover fieldset": {
            border: "none",
            outline: "none",
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#303030",
          display: "block",
          height: "100%",
          padding: "10px 10px",
          borderRadius: "0 4px 4px 0",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#505050",
          },
        }}
      >
        Tìm kiếm ngay
      </Button>
    </Box>
  );
};

export default SearchForm;
