function hasIntersection(range1, range2) {
  const [a, b] = range1;
  const [c, d] = range2;

  return (
    (c <= a && a <= d) ||
    (c <= b && b <= d) ||
    (a <= c && c <= b) ||
    (a <= d && d <= b)
  );
}

function isSubset(range1, range2) {
  const [a, b] = range1;
  const [c, d] = range2;

  return (c <= a && b <= d) || (a <= c && d <= b);
}

export { hasIntersection, isSubset };
