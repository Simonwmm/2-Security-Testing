public class Hello {
    public static void main(String[] args) {
        String input = args[0]; 
        System.out.println("SELECT * FROM users WHERE id = '" + input + "'"); 
    }
}