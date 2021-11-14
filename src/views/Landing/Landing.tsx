import Characters from "@breakingbad/components/Characters";
import Loading from "@breakingbad/components/Loading";
import { getCharacters } from "@breakingbad/context/characters";
import { useDispatch } from "@breakingbad/utils/Context";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function Landing() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCharacters()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
		return <Loading />;
	}

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card">
          <Header />
          <Characters />
        </div>
      </div>
    </div>
  );
}