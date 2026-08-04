import java.io.*;
import java.util.*;

public class TestClass {

    public static void main(String[] args) throws Exception {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1️⃣ Read components order
        String[] components = br.readLine().split(",");

        // 2️⃣ Read relations
        Map<String, Integer> relation = new HashMap<>();
        Map<String, String> child = new HashMap<>();

        for (int i = 0; i < components.length - 1; i++) {
            String line = br.readLine(); // e.g. Shelve is 2Draw
            String[] parts = line.split(" ");
            String parent = parts[0];
            int value = Integer.parseInt(parts[2].replaceAll("[^0-9]", ""));
            String childComp = parts[2].replaceAll("[0-9]", "");

            relation.put(parent, value);
            child.put(parent, childComp);
        }

        // 3️⃣ Convert all to smallest unit
        String smallest = components[0];
        Map<String, Integer> total = new HashMap<>();
        total.put(smallest, 1);

        for (int i = 1; i < components.length; i++) {
            String curr = components[i];
            String prev = components[i - 1];

            int multiplier = relation.get(prev);
            total.put(curr, total.get(prev) * multiplier);
        }

        // 4️⃣ Print output (largest → smallest)
        StringBuilder sb = new StringBuilder();
        int base = total.get(components[components.length - 1]);

        for (int i = components.length - 1; i >= 0; i--) {
            String comp = components[i];
            sb.append(base / total.get(comp))
              .append(comp);
            if (i != 0) sb.append(" equals ");
        }

        System.out.println(sb.toString());
    }
}