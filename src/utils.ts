const generateLinks = (resource: string, id: string) => {
  return {
    self: { href: `/${resource}/${id}` },
    collection: { href: `/${resource}` },
    update: { href: `/${resource}/${id}`, method: "PUT" },
    delete: { href: `/${resource}/${id}`, method: "DELETE" },
  };
};

export default generateLinks;
